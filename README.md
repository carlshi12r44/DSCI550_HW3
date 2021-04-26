## How would you run the project

### all the images are free for use (free stock images), no copyright issues

- first you need to have visual studio code
- second you can download live server extension from visual studio marketplace

The main script for hosting the visualizations is sitting inside `$ROOT_DIRECTORY/source/websites/index.html`
you can go to the file and use live server to open the page by right clicking and `Open with Live Server`

The structure of the project is shown below
root

- data
  - input_part3
    - this folder contains inputs for part 3
  - input_part4
    - this folder contains inputs for part 4
  - input_part6
    - this folder contains inputs for part6 for how to run, refer to `/source/python_code/part6`
  - part4_smqtk_similarity_outputs
    - this folder contains part 4 SMQTK similarity outputs
  - part5_indices
    - this folder contains elasticsearch and ImageCat indices
  - total
    - this folder contains images from hw2 scammer persona images for hw 3 part 4
- source
  - images
    - all images for background, all of them are storing in S3 storage bucket.
  - python_code
    - part 6
      - part 6 folder stores the codes and shell command for running part 6
    - `part3_ingest_elasticsearch.py`
      - part 3 for ingestion by using elasticsearch
    - `prepare_part2_viz4_data_step2.py`
      - this script is preparation of visualization 4 data step 2, don't have to run it
    - `prepare_part2_viz4_data.py`
      - this is also preparation of visualization 4 data, don't have to run it
    - `part4_lists_txt_file_prep.py`
      - (ARCHIVED) don't run it
    - `test.py`
      - (ARCHIVED test script, don't run it
  - websites
    - `index.html`
      - Landing Page for the project, which is the home to all the visualizations
    - `visual_viz1.html`
      - first visualization page
    - `visual_viz2.html`
      - second visualization page
    - `visual_viz3.html`
      - third visualization page
    - `visual_viz4.html`
      - forth visualization page
    - `part2_viz5.html`
      - Fifth visualization page
    - `part2_viz1.js`
      - visualization 1 D3 javascript file
    - `part2_viz2.js`
      - visualization 2 D3 javascript file
    - `part2_viz3.js`
      - visualization 3 D3 javascript file
    - `part2_viz4.js`
      - visualization 4 D3 javascript file
    - `part2_viz5.js`
      - visualization 5 D3 javascript file

## Technology Used in this project

    [1] Javascript
    [2] D3
    [3] Apache Tika
    [4] Apache Solr
    [5] ElasticSearch
    [6] AWS S3
    [7] NASAJPLMEMEX GeoParser
    [8] NASAJPLMEMEX ImageSpace
    [9] HTML

The MIT License (MIT)
=====================

Copyright © `2021` `USC`

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

