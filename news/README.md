# News Posts

News posts appear on the [News](https://ornl.github.io/software-catalog/news/), [Events](https://ornl.github.io/software-catalog/news/events/), and [Archive](https://ornl.github.io/software-catalog/news/archive/) pages in reverse chronological order (i.e., newest first). The list is curated to promote ORNL's open source endeavors and community engagement. Posts should be tagged with at least one of the following categories, which are not associated with the [catalog topics](../../_posts) applied to repos:

-   `event` - announcement of an upcoming event/conference
-   `event-report` - recap of an event/conference
-   `multimedia` - synopsis of a video or podcast published on another platform (e.g., YouTube)
-   `new-repo` - announcement of new repo added to ORNL's software catalog
-   `profile` - profile of a developer
-   `release` - announcement of substantial software release (i.e., more than bug fixes)
-   `story` - synopsis of a relevant news or research-focused article
-   `this-website` - announcement of feature enhancement or other changes to this site

Categories should appear alphabetically in each post's frontmatter under the title, with no punctuation between multiple categories:

```
title: "Title of Post"
categories: new-repo story
```

ORNL's [.github repo](https://github.com/ORNL/.github/tree/main/news-templates) contains .md templates for each of these types of posts. For posts that combine multiple tags (e.g., multimedia, event), a combination of templates may be used. File naming conventions are also provided.
