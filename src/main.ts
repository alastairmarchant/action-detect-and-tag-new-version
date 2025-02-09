import { getInput, setFailed, setOutput, info } from '@actions/core';
import { determineVersion } from './determine-version';
import { validateHistoryDepth, checkout, createTag, refExists } from './git';
import { getEnv, getEnvOrNull } from './utils';

const VERSION_PLACEHOLDER = /{VERSION}/g;

async function run(): Promise<void> {
  await validateHistoryDepth();
  await checkout('HEAD~1');

  let previousVersion = await determineVersion();

  info(`Previous version: ${previousVersion}`);
  setOutput('previous-version', previousVersion);

  const checkoutRef = getEnvOrNull('GITHUB_HEAD_REF') || getEnv('GITHUB_REF');

  await checkout(checkoutRef);

  let currentVersion = await determineVersion();

  info(`Current version: ${currentVersion}`);
  setOutput('current-version', currentVersion);

  if (currentVersion !== previousVersion && getInput('create-tag') !== 'false') {
    let tagTemplate = getInput('tag-template') || 'v{VERSION}';
    let tag = tagTemplate.replace(VERSION_PLACEHOLDER, currentVersion);

    let annotationTemplate = getInput('tag-annotation-template') || 'Released version {VERSION}';
    let annotation = annotationTemplate.replace(VERSION_PLACEHOLDER, currentVersion);

    if (await refExists(tag)) {
      info(`Tag ${tag} already exists`);
    } else {
      info(`Creating tag ${tag}`);
      setOutput('tag', tag);

      await createTag(tag, annotation);
    }
  }
}

run().catch(e => setFailed(e.message));
