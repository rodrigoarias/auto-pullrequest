const core = require('@actions/core')
const github = require('@actions/github')
const { Octokit } = require('@octokit/rest');
const fetch = require('node-fetch');

const main = async (workspace) => {
	const myToken = core.getInput('git-token');
	const title = core.getInput('title');
	const body = core.getInput('body');
	const baseBranch = core.getInput('base-branch');

	const repoOwner = process.env.GITHUB_REPOSITORY_OWNER;
	const repoFullName = process.env.GITHUB_REPOSITORY;
	const repoName = repoFullName.split("/")[1];
	const branchRef = process.env.GITHUB_REF;
	const branchName = branchRef.split("/").slice(2).join("/"); // Remove "refs/heads/"
	
	console.log('Repository Owner:', repoOwner);
	console.log('Repository Name:', repoName);
	console.log('Branch Name:', branchName);

	const octokit = new Octokit(
		{
			auth: myToken,
			request: {
				fetch: fetch
			  },
		});

	console.log(`Attempting to create Pull Request from ${branchName} to ${baseBranch}`);

	try {
		const response = await octokit.pulls.create({
			owner: repoOwner,
			repo: repoName,
			title: title,
			body: body,
			head: branchName, // The branch you want to merge
			base: baseBranch // The branch you want to merge into
		});
		console.log('Pull request created:', response.data.html_url);
	} catch (error) {
		console.error('Error creating pull request:', error);
	}
}

main()
