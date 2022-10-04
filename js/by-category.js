const REPO_SECTION_ELEMENT = document.getElementById('repositories');
const NAV_ELEMENT = document.getElementById('category-nav');
const MOBILE_NAV_ELEMENT = document.getElementById('category-hamburger-nav');
const REPO_HEADER_ELEMENT = document.getElementById('category-header');

const REPO_INPUT_ELEMENT = document.getElementById('searchText');

//let searchTimeout; // TODO uncomment debounce once we have enough data
let filterText = '';
/**
 * if this starts with a '-', reverse the sort order
 */
let orderProp = '-stars';
let selectedCategoryIndex = 0;
let catData = [];
let topicRepos = [];

/**
 *
 * @param {String} str provided string
 * @returns string with first character of each word capitalized
 */
function titleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

//check if repo is tagged as one of the categories
function containsTopics(catTopics, repoTopics) {
  if (!catTopics.length) return true;
  for (let i = 0; i < catTopics.length; i++) {
    if (repoTopics.includes(catTopics[i])) {
      return true;
    }
  }
  return false;
}

function renderHeaderHtml() {
  // selectedCategoryIndex will be set to a valid number on initialization
  const category = catData[selectedCategoryIndex];
  REPO_HEADER_ELEMENT.innerHTML = `
    <img
      src="${window.config.baseUrl}${category.icon.path}"
      width="125"
      height="125"
      alt="${category.icon.alt}"
      title="${category.icon.alt}"
      loading="lazy"
    />
    <div class="title-description">
      <h2>${category.title}</h2>
      <p>${category.description.short}${category.description.long}</p>
    </div>
  `;
}

function renderRepoHtml() {
  const isOrderReversed = orderProp.startsWith('-');
  const resolvedOrderProp = isOrderReversed ? orderProp.slice(1) : orderProp;
  const items = topicRepos[selectedCategoryIndex]
    .filter(
      (repo) =>
        repo.name.toLowerCase().includes(filterText) ||
        repo.owner.toLowerCase().includes(filterText) ||
        repo.language?.toLowerCase().includes(filterText) ||
        repo.description?.toLowerCase().includes(filterText),
    )
    .sort((a, b) => {
      const x = a[resolvedOrderProp];
      const y = b[resolvedOrderProp];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  if (isOrderReversed) {
    items.reverse();
  }
  REPO_SECTION_ELEMENT.innerHTML = items
    .map(
      (repo) => `
  <div class="flex-item">
    <a href="${window.config.baseUrl}/repo?name=${encodeURIComponent(repo.nameWithOwner)}">
      <h3 class="text-center">
        <span title="Name">${repo.name}</span>
        <small><span title="Owner">${repo.owner}</span></small>
        <small><span title="Primary Language">${repo.language || '-'}</span></small>
      </h3>
    </a>
    ${repo.description ? `<p>${sanitizeHTML(repo.description)}</p>` : ''}

    <p class="stats text-center">
      <a href="${repo.gitUrl}" title="GitHub Page">
        <span class="fa fa-github"></span>
      </a>

      <a href="${repo.gitUrl}/stargazers" title="Stargazers">
        <span class="fa fa-star"></span> ${repo.stars}
      </a>

      <a href="${repo.gitUrl}/network" title="Forks">
        <span class="fa fa-code-fork"></span> ${repo.forks}
      </a>
      ${
        repo.homepageUrl
          ? `
        <a href="${repo.homepageUrl}" title="Project Website">
          <span class="fa fa-globe"></span>
        </a>
      `
          : ''
      }
    </p>
  </div>
  `,
    )
    .join('');
}

/**
 * Call when the user updates category (either through the UI or through the browser)
 *
 * @param {number} categoryIdx selected index of the category
 */
function onCategoryUpdate(categoryIdx) {
  selectedCategoryIndex = categoryIdx;
  const categoryButtons = document.getElementsByClassName('tab');
  for (let i = 0; i < categoryButtons.length; i++) {
    const button = categoryButtons[i];
    if (button.id.endsWith(categoryIdx)) {
      button.classList.add('selected-tab');
    } else {
      button.classList.remove('selected-tab');
    }
  }
  renderHeaderHtml();
  renderRepoHtml();
}

// init
fetch(`${window.config.baseUrl}/category/category_info.json`)
  .then((res) => res.json())
  .then((catInfoJson) => {
    catData = Object.values(catInfoJson.data)
      .map((data) => {
        data['displayTitle'] = titleCase(data.title);
        // this is used both in the URL and the HTML ID
        data['urlParam'] = categoryToUrl(data.title);
        return data;
      })
      .sort((a, b) => {
        const x = a['displayTitle'];
        const y = b['displayTitle'];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    catData.unshift({
      title: 'ALL SOFTWARE',
      icon: {
        path: '/assets/images/categories/catalog.svg',
        alt: 'All Software',
      },
      description: {
        short: `Browse all ${window.config.labName} open source projects`,
        long: '',
      },
      displayTitle: 'All Software',
      urlParam: 'all',
      topics: [],
    });
    // get selected index from URL query param, or default to "all software" if invalid/no param
    const initialCategory = new URLSearchParams(window.location.search).get('name')?.toLowerCase() || 'all';
    for (let c = 0; c < catData.length; c++) {
      if (catData[c].urlParam === initialCategory) {
        selectedCategoryIndex = c;
        break;
      }
    }

    // render category specific HTML
    renderHeaderHtml();
    NAV_ELEMENT.innerHTML = catData
      .map(
        (category, idx) => `
      <button id="btn__${idx}" class="tab${idx === selectedCategoryIndex ? ' selected-tab' : ''}">
        <img
          src="${window.config.baseUrl}${category.icon.path}"
          height="40"
          width="40"
          alt="${category.icon.alt}"
          title="${category.icon.alt}"
          loading="lazy"
        />
        <span>
          ${sanitizeHTML(category.displayTitle)}
        </span>
      </button>
    `,
      )
      .join('');
    MOBILE_NAV_ELEMENT.innerHTML = catData
      .map(
        (category, idx) => `
      <button id="nav-btn__${idx}" class="tab${idx === selectedCategoryIndex ? ' selected-tab' : ''}">${sanitizeHTML(
          category.displayTitle,
        )}</button>
    `,
      )
      .join('');
    const tabElements = document.getElementsByClassName('tab');
    for (let i = 0; i < tabElements.length; i++) {
      const ele = tabElements[i];
      const tabIdx = Number(ele.id.split('__')[1]);
      ele.addEventListener('click', () => {
        window.history.pushState({ categoryIndex: tabIdx }, '', `?name=${catData[tabIdx].urlParam}`);
        onCategoryUpdate(tabIdx);
      });
    }

    // map topics to categories
    fetch(`${window.config.baseUrl}/explore/github-data/intRepos_Topics.json`)
      .then((res) => res.json())
      .then((topicJson) => {
        const reposObj = topicJson.data;
        catData.forEach((category) => {
          const catRepos = [];
          for (let r in reposObj) {
            const repo = reposObj[r];
            const topics = [];
            for (let t in repo.repositoryTopics.nodes) {
              topics.push(repo.repositoryTopics.nodes[t].topic.name);
            }
            if (containsTopics(category.topics, topics)) {
              catRepos.push({ nameWithOwner: r });
            }
          }
          topicRepos.push(catRepos);
        });
        fetch(`${window.config.baseUrl}/explore/github-data/intReposInfo.json`).then((res) => res.json())
          .then((infoJson) => {
            const reposInfoObj = infoJson.data;
            for (let repo in reposInfoObj) {
              //reposInfoObj[repo] is the actual repo object
              for (let j in topicRepos) {
                //var category is array of objects
                const category = topicRepos[j];
                for (let count in category) {
                  // category[count] is a specific repo within a category
                  //if we find a repo that is included in the category repos, we save more info on it
                  if (category[count].nameWithOwner === reposInfoObj[repo].nameWithOwner) {
                    //save only necessary data fields
                    category[count]['name'] = reposInfoObj[repo].name;
                    category[count]['description'] = reposInfoObj[repo].description;
                    category[count]['ownerAvatar'] = reposInfoObj[repo].owner.avatarUrl;
                    category[count]['owner'] = reposInfoObj[repo].owner.login;
                    category[count]['stars'] = reposInfoObj[repo].stargazers.totalCount;
                    category[count]['gitUrl'] = reposInfoObj[repo].url;
                    category[count]['homepageUrl'] = reposInfoObj[repo].homepageUrl;
                    if (reposInfoObj[repo].primaryLanguage) {
                      category[count]['language'] = reposInfoObj[repo].primaryLanguage.name;
                    } else {
                      category[count]['language'] = '';
                    }
                    category[count]['forks'] = reposInfoObj[repo].forks.totalCount;
                  }
                }
              }
            }
            renderRepoHtml();
          });
      });
  });

// searching
document.getElementById('searchText').addEventListener('input', (e) => {
  filterText = e.target.value.toLowerCase();
  renderRepoHtml();
  // TODO test out debounce when we have a lot of data
  // clearTimeout(searchTimeout);
  // searchTimeout = setTimeout(() => {
  //   filterText = e.target.value.toLowerCase();
  //   renderRepoHtml();
  // }, 1000);
});

// sorting
document.getElementById('orderProp').addEventListener('change', (e) => {
  orderProp = e.target.value;
  renderRepoHtml();
});

// mobile nav
document.getElementById('category-hamburger-btn').addEventListener('click', () => {
  MOBILE_NAV_ELEMENT.classList.toggle('hidden');
});

// user presses back/forward buttons on their browser
window.addEventListener('popstate', (e) => {
  const oldState = e.state?.categoryIndex;
  const hasOldState = typeof oldState === 'number';
  if (!hasOldState || oldState !== selectedCategoryIndex) {
    onCategoryUpdate(hasOldState ? oldState : 0);
  }
});
