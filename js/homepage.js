const MAX_REPOS_TO_SHOW = 4;

/**
 * check if repo is tagged as one of the categories
 *
 * @param {Array<string>} catTopics
 * @param {Array<string>} repoTopics
 * @returns boolean
 */
function containsTopics(catTopics, repoTopics) {
  for (let i = 0; i < catTopics.length; i++) {
    if (repoTopics.includes(catTopics[i])) {
      return true;
    }
  }
  return false;
}

function uniqueLogo(logos, fileName, ownerAvatar) {
  let match = false;
  let file;
  for (let f in logos) {
    if (logos[f] === fileName) {
      match = true;
      file = logos[f];
      break;
    }
  }
  // if repo has unique logo use it
  if (match) {
    return '/assets/images/logos/' + file;
  }
  // if repo does not have unique logo use org logo
  return ownerAvatar;
}

// init
fetch(`${window.config.baseUrl}/category/category_info.json`)
  .then((res) => res.json())
  .then((json) => {
    const catData = Object.values(json.data).sort((a, b) => {
      const x = a['title'].toLowerCase();
      const y = b['title'].toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    fetch(`${window.config.baseUrl}/explore/github-data/intRepos_Topics.json`)
      .then((res) => res.json())
      .then((topicJson) => {
        const reposObj = topicJson.data;
        let topicRepos = Object.values(catData).map((cat) => {
          const catRepos = [];

          for (let r in reposObj) {
            const repo = reposObj[r];
            const topics = [];
            for (let t in repo.repositoryTopics.nodes) {
              const repoTopic = repo.repositoryTopics.nodes[t].topic.name;
              topics.push(repoTopic);
            }
            if (containsTopics(cat.topics, topics)) {
              catRepos.push({ nameWithOwner: r });
            }
          }
          return catRepos;
        });
        fetch(`${window.config.baseUrl}/assets/images/logos/repo_logos.json`)
          .then((res) => res.json())
          .then((logosJson) => {
            const logos = logosJson.data;
            fetch(`${window.config.baseUrl}/explore/github-data/intReposInfo.json`)
              .then((res) => res.json())
              .then((infoJson) => {
                const reposInfoObj = infoJson.data;
                for (let repo in reposInfoObj) {
                  // reposInfoObj[repo] is the actual repo object
                  for (let j in topicRepos) {
                    // category is array of objects
                    const category = topicRepos[j];
                    for (let count in category) {
                      // category[count] is a specific repo within a category
                      // if we find a repo that is included in the category repos, we save more info on it
                      if (category[count].nameWithOwner === reposInfoObj[repo].nameWithOwner) {
                        category[count]['name'] = reposInfoObj[repo].name;
                        category[count]['description'] = reposInfoObj[repo].description;
                        // call unique logo function to get repo logo uniqueLogo(logos, filename, ownerAvatar)
                        category[count]['ownerAvatar'] = uniqueLogo(
                          logos,
                          category[count].nameWithOwner.toLowerCase() + '.png',
                          reposInfoObj[repo].owner.avatarUrl,
                        );
                        category[count]['ownerLogin'] = reposInfoObj[repo].owner.login;
                        category[count]['stars'] = reposInfoObj[repo].stargazers.totalCount;
                        category[count]['gitUrl'] = reposInfoObj[repo].url;
                        category[count]['homepageUrl'] = reposInfoObj[repo].homepageUrl;
                      }
                    }
                  }
                }
                //sort categories by stars descending
                topicRepos = topicRepos.sort((a, b) => {
                  const x = a['stars'];
                  const y = b['stars'];
                  return x > y ? -1 : x < y ? 1 : 0;
                });

                // BUILD HTML
                document.getElementById('categories').innerHTML = catData
                  .map((category, categoryIdx) => `
                  <div class="flex-category dynamic">
                    <a class="dynamic-link" href="${window.config.baseUrl}/category/?name=${categoryToUrl(category.title)}">
                      <img src="${window.config.baseUrl}${category.icon.path}" height="150" width="150" alt="${category.icon.alt}" loading="lazy" />
                      <h2>${sanitizeHTML(category.title)}</h2>
                      <p class="text-center">${sanitizeHTML(category.description.short)}</p>
                    </a>
                    <div>
                    ${topicRepos[categoryIdx].slice(0, MAX_REPOS_TO_SHOW).map(
                      (repo) => `
                      <p class="links">
                        <span>
                          <a href="https://github.com/${repo.ownerLogin}" title="Owner: ${repo.ownerLogin}">
                            <img class="orgAvatar" width="35" height="35" src="${repo.ownerAvatar}" alt="Owner: ${repo.ownerLogin}" loading="lazy" />
                          </a>
                        </span>

                        <span>
                          <a
                            href="${repo.gitUrl}"
                            ${repo.description ? `title="${repo.description}" aria-label="${repo.description}"` : ''}
                          >
                            ${sanitizeHTML(repo.name)}
                          </a>
                        </span>

                        <span>
                          <a href="${repo.gitUrl}/stargazers" title="Stargazers"> ${repo.stars} <span class="fa fa-star"></span> </a>
                        </span>

                        <span>
                          <a href="${window.config.baseUrl}/repo/?name=${encodeURIComponent(repo.nameWithOwner)}" title="Repo Info">
                            <span class="fa fa-info-circle"></span>
                          </a>
                        </span>
                      </p>
                    `).join('')}
                    </div>
                    ${topicRepos[categoryIdx].length > MAX_REPOS_TO_SHOW ? `<a href="${window.config.baseUrl}/category/?name=${categoryToUrl(category.title)}" class="more">MORE...</a>` : ''}
                  </div>
                `).join('');
              });
          });
      });
  });
