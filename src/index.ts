import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { EventPayloads } from "@octokit/webhooks";

const token =
  getInput("token") || process.env.GH_PAT || process.env.GITHUB_TOKEN;

export const run = async () => {
  if (!token) throw new Error("GitHub token not found");
  const octokit = getOctokit(token);

  /**
   * This action will only work on `pull_request` events
   */
  if (!context.payload.pull_request)
    return console.log("No pull request found");

  const pullRequest = (context as any).payload.pull_request
    .body as EventPayloads.WebhookPayloadPullRequestPullRequest;

  console.log("Pull number", pullRequest);
  console.log("Merged", pullRequest.merged, (pullRequest as any).merged);

  /**
   * Pull request has been merged
   */
  if (pullRequest.merged) {
    try {
      if (
        !(getInput("protectBranches") || "")
          .split(",")
          .map((branch) => branch.trim())
          .includes(pullRequest.base.ref)
      )
        await octokit.git.deleteRef({
          owner: context.repo.owner,
          repo: context.repo.repo,
          ref: pullRequest.base.ref,
        });
    } catch (error) {}
  }
};

run()
  .then(() => {})
  .catch((error) => {
    console.error("ERROR", error);
    setFailed(error.message);
  });
