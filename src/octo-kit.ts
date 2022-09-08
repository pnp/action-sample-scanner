import { getOctokit } from "@actions/github";

export type OctoKitType = ReturnType<typeof getOctokit>;

let octokit: OctoKitType = null;

export function init(token: string): OctoKitType {

    octokit = getOctokit(token);

    // from github import Github
    // g = Github()
    // repo = g.get_repo("datasets/population")
    // print(repo.name)
    // commits = repo.get_commits(path='data/population.csv')
    // print(commits.totalCount)
    // if commits.totalCount:
    //     print(commits[0].commit.committer.date)



    return octokit;
}

export function get(): OctoKitType {
    
    if (typeof octokit === "undefined" || octokit === null) {
        throw Error("You must call init before get to ensure the octokit instance is created.");
    }

    return octokit;
}

