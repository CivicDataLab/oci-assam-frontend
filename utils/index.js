import { config } from '../config';

// fetch medium post banner URL
export function getMediumBanner(postContent) {
  const srcIndex = postContent.indexOf('src=');
  const srcStart = srcIndex + 5;
  const srcEnd = postContent.substring(srcStart).indexOf('"') + srcStart;
  const src = postContent.substring(srcStart, srcEnd);
  return src;
}

export function getOrgLogo(url) {
  return `http://${config.CKAN_URL}/uploads/group/${url}`;
}

// fetch list of datasets. Required: type - type of dataset; variables - from url parameters.
export async function fetchDatasets(type, variables) {
  function changeKeyName(key) {
    if (key == 'size') return 'rows';
    else if (key == 'from') return 'start';
    else return key;
  }

  variables.fq
    ? (variables.fq = variables.fq.concat(
        ` AND private:false AND type:${type}`
      ))
    : (variables.fq = `private:false AND type:${type}`);

  // creating a string of parameter from object of variables for CKAN API use
  const varArray = Object.keys(variables).map((key) => {
    return `${changeKeyName(key)}=${variables[key]}`;
  });
  const varString =
    varArray.length > 0
      ? varArray.join('&')
      : `fq=private:false AND type:${type}`;
  const response = await fetch(
    `${config.CKAN_API_URL}/package_search?${varString}`
  );
  const data = await response.json();
  return data;
}

// fetch particular dataset
export async function fetchAPI(path) {
  const response = await fetch(
    `${config.CKAN_API_URL}/package_show?id=${path}`
  );
  const data = await response.json();
  return data;
}

export async function getFilters(list, variable, page) {
  try {
    // if filters and searc found in url, also use those
    const queryVars = `fq=${variable.fq ? `type:${page}` : `type:${page}`}&q=${
      variable.q ? variable.q : ''
    }`;

    const fetchData = await fetch(
      `${config.CKAN_API_URL}/package_search?facet.field=[${list}]&${queryVars}`
    ).then((res) => res.json());
    return fetchData.result.search_facets;
  } catch (error) {
    throw new Error(error);
  }
}

export function convertToCkanSearchQuery(query) {
  const ckanQuery = {};
  // sort query
  if (query.sort) {
    ckanQuery.sort = query.sort ? query.sort.replace(':', ' ') : '';
  }

  // searched query
  if (query.q) ckanQuery.q = query.q.trim();

  // filtered query
  if (query.fq) {
    ckanQuery.fq = ckanQuery.fq ? ckanQuery.fq + ' ' + query.fq : query.fq;
  }

  // number of datasets to return
  if (query.size) ckanQuery.rows = query.size;

  // pagination
  if (query.from) ckanQuery.start = query.from;

  return ckanQuery;
}

export function ckanToDataPackage(descriptor) {
  // Make a copy
  const datapackage = JSON.parse(JSON.stringify(descriptor));

  // Lowercase name
  datapackage.name = datapackage.name.toLowerCase();

  // Rename notes => description
  if (datapackage.notes) {
    datapackage.description = datapackage.notes;
    delete datapackage.notes;
  }

  // Rename ckan_url => homepage
  if (datapackage.ckan_url) {
    datapackage.homepage = datapackage.ckan_url;
    delete datapackage.ckan_url;
  }

  // Parse license
  const license = {};
  if (datapackage.license_id) {
    license.type = datapackage.license_id;
    delete datapackage.license_id;
  }
  if (datapackage.license_title) {
    license.title = datapackage.license_title;
    delete datapackage.license_title;
  }
  if (datapackage.license_url) {
    license.url = datapackage.license_url;
    delete datapackage.license_url;
  }
  if (Object.keys(license).length > 0) {
    datapackage.license = license;
  }

  // Parse author and sources
  const source = {};
  if (datapackage.author) {
    source.name = datapackage.author;
    delete datapackage.author;
  }
  if (datapackage.author_email) {
    source.email = datapackage.author_email;
    delete datapackage.author_email;
  }
  if (datapackage.url) {
    source.web = datapackage.url;
    delete datapackage.url;
  }
  if (Object.keys(source).length > 0) {
    datapackage.sources = [source];
  }

  // Parse maintainer
  const author = {};
  if (datapackage.maintainer) {
    author.name = datapackage.maintainer;
    delete datapackage.maintainer;
  }
  if (datapackage.maintainer_email) {
    author.email = datapackage.maintainer_email;
    delete datapackage.maintainer_email;
  }
  if (Object.keys(author).length > 0) {
    datapackage.author = author;
  }

  // Parse tags
  if (datapackage.tags) {
    datapackage.keywords = [];
    datapackage.tags.forEach((tag) => {
      datapackage.keywords.push(tag.name);
    });
    delete datapackage.tags;
  }

  const meta = {};
  // Parse meta
  if (datapackage.tender_date) {
    meta.date = datapackage.tender_date;
    delete datapackage.tender_date;
  }
  if (datapackage.fiscal_year) {
    meta.fiscal_year = datapackage.fiscal_year;
    delete datapackage.fiscal_year;
  }
  if (Object.keys(meta).length > 0) {
    datapackage.meta = meta;
  }

  // Resources
  datapackage.resources = datapackage.resources.map((resource) => {
    if (resource.name) {
      resource.title = resource.title || resource.name;
      resource.name = resource.name.toLowerCase()
        ? resource.name.toLowerCase().replace(/ /g, '_')
        : '';
    } else {
      resource.name = resource.id;
    }

    if (!resource.schema) {
      // If 'fields' property exists use it as schema fields
      if (resource.fields) {
        if (typeof resource.fields === 'string') {
          try {
            resource.fields = JSON.parse(resource.fields);
          } catch (e) {
            console.error('Could not parse resource.fields');
          }
        }
        resource.schema = { fields: resource.fields };
        delete resource.fields;
      }
    }

    return resource;
  });

  return datapackage;
}

// function to create tabbed interface
export function tabbedInterface(tablist, panels) {
  // Get relevant elements and collections
  const tabs = tablist.querySelectorAll('a');

  // The tab switching function
  const switchTab = (oldTab, newTab) => {
    newTab.focus();
    // Make the active tab focusable by the user (Tab key)
    newTab.removeAttribute('tabindex');
    // Set the selected state
    newTab.setAttribute('aria-selected', 'true');
    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');
    // Get the indices of the new and old tabs to find the correct
    // tab panels to show and hide
    let index = Array.prototype.indexOf.call(tabs, newTab);
    let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
    panels[oldIndex].hidden = true;
    panels[index].hidden = false;
  };

  // Add the tablist role to the first <ul> in the .tabbed container
  tablist.setAttribute('role', 'tablist');

  // Add semantics are remove user focusability for each tab
  Array.prototype.forEach.call(tabs, (tab, i) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('id', 'tab' + (i + 1));
    tab.setAttribute('tabindex', '-1');
    tab.parentNode.setAttribute('role', 'presentation');

    // Handle clicking of tabs for mouse users
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      let currentTab = tablist.querySelector('[aria-selected]');
      if (e.currentTarget !== currentTab) {
        switchTab(currentTab, e.currentTarget);
      }
    });

    // Handle keydown events for keyboard users
    tab.addEventListener('keydown', (e) => {
      // Get the index of the current tab in the tabs node list
      let index = Array.prototype.indexOf.call(tabs, e.currentTarget);
      // Work out which key the user is pressing and
      // Calculate the new tab's index where appropriate
      let dir =
        e.which === 37
          ? index - 1
          : e.which === 39
          ? index + 1
          : e.which === 40
          ? 'down'
          : null;
      if (dir !== null) {
        e.preventDefault();
        // If the down key is pressed, move focus to the open panel,
        // otherwise switch to the adjacent tab
        dir === 'down'
          ? panels[i].focus()
          : tabs[dir]
          ? switchTab(e.currentTarget, tabs[dir])
          : void 0;
      }
    });
  });

  // Add tab panel semantics and hide them all
  Array.prototype.forEach.call(panels, (panel, i) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('tabindex', '-1');
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.hidden = true;
  });

  // Initially activate the first tab and reveal the first tab panel
  tabs[0].removeAttribute('tabindex');
  tabs[0].setAttribute('aria-selected', 'true');
  panels[0].hidden = false;
}
