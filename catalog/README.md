# Website Categories

This folder is the home of the JSON file containing the info for the software catalog categories that are displayed on the website's home page. If any edits need to be made to these categories, just edit the data in the JSON and the home page will reflect your changes automatically. (These catalog categories/topics are separate from the category tags on News posts.)

A repository can have up to 20 tags. The list below also contains each category's blurb to ensure consistency in phrasing and length. Note that in some cases the category is plural but the corresponding tag is singular.

For each category, this file contains its title, [icon][icon dir] filepath, and category description. This data is read by the [category info javascript][js dir].

- **Data Science & Machine Learning**: Domain-aware methods to ingest scientific knowledge and robust Machine Learning techniques that aid in simulation and automating scientific and engineering processes - `artificial-intelligence`, `data-wrangling`, `evolutionary-algorithms`, `intelligent-agents`, `machine-learning`, `clustering`, `neuromorphic-computing`, `reduced-order-models`, `text-analysis`
- **Data Management**: Robust systems which capture both the data and metadata needed for secure storage, searchability and harmonization throughout the data’s lifecycle - `data-enclave`, `data-integration`, `data-lifecycle management`, `data-storage-systems`, `in-situ-and-in-transit-workflows`, `intelligent-data-management`, `intelligent-automated-archives`, `portals`, `storage-and-io`
- **Data Analysis & Visualization**: Manage visualizations with robust features and configurable analysis - `data-reduction`, `data-ingest-and-cross-validation`, `data-services`, `data-visualization`, `design-of-experiments`, `feature-extraction`, `in-situ-analysis`, `metadata-management`, `information-visualization`, `portals`, `scientific-visualization`, `statistical-analysis`, `visual-analytics`
- **User Driven Software & Systems**: The interaction between humans and information in order to solve problems using software, systems, and technologies that must integrate seamlessly in order to provide an efficient and effective computational environment for scientific discovery and advancement - `adaptive-workflows`, `community-adoption`, `compilers`, `informatics-systems`, `infrastructure-as-code`, `mathematical-tools`, `portals`, `programming-languages`, `programming-models`, `resource-management`, `secure-cloud`, `software-engineering`, `standardization-efforts`
- **Accelerated Performance Computing**: Energy efficient, high performance, reliable and small form factor architectures, which are augmented with more advanced programming models, compilers, and performance analysis and modeling techniques, intelligent run-time resource managers and operating systems - `accelerators`, `hardware-evaluation-and-design`, `heterogeneous-computing`, `neuromorphic-computing`, `runtime-systems`, `emerging-technologies`, `high-performance-computing`, `high-performance-networking`, `performance-modeling-and-analysis`, `programming-models`, `quantum-computing`, `resource-management`, `storage-and-io`
- **Federated and Autonomous Systems**: Systems that allow interoperability and information sharing between semi-autonomous or fully autonomous de-centrally organized information technology systems and applications - `code-coupling`, `communications-middleware`, `cyber-physical-and-iot`, `edge-computing`, `federated-computing`, `multi-physics-and-multiscale`
- **Algorithmic Innovation**: Innovative algorithms for solving large-scale scientific and engineering problems on advanced computer architecture - `algorithm-optimization`, `discrete-simulation`, `evolutionary-algorithms`, `graph-algorithms`, `high-order-approximation-models`, `integration-of-data-and-simulation`, `inverse-problems`, `multi-physics-and-multiscale`, `clustering`, `reduced-order-models`, `uncertainty-quantification`

To add a new category to the catalog:

1. Update this README with the category name (in alphabetical order), description, and tag.
2. Add the new icon (.svg) to [Assets > Images > Categories][icon dir].
3. Update [`category_info.json`](category_info.json) with category metadata such as image file path, descriptive blurb, and corresponding topic(s).
4. Tag repos with the new topic as appropriate.

[icon dir]: ../assets/images/categories/
[js dir]: ../js/homepage.js
