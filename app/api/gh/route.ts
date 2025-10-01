import { NextResponse } from "next/server";

export async function GET(){
  const user = "raavirahul"; // change if needed
  try{
    const [u, repos] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`, { next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${user}/repos?per_page=100`, { next: { revalidate: 3600 } }),
    ]);
    const ud = await u.json();
    const rd = await repos.json();
    const stars = rd?.reduce((a:any,r:any)=>a+(r.stargazers_count||0),0) || 0;
    const commits = 0; // optional: compute via GraphQL token
    return NextResponse.json({ stars, repos: rd?.length || 0, followers: ud.followers, commits });
  }catch(e){
    return NextResponse.json({ stars:0, repos:0, followers:0, commits:0 });
  }
}
