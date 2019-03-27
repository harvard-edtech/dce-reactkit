# dce-reactkit
A collections of simple tools and UI elements for quickly and easily building React-based apps.

## Quickstart

1. Install `dce-reactkit` into your React project:

```bash
npm install dce-reactkit --save
```

2. Import `dce-reactkit` components into your React component:

```js
import Button from 'dce-reactkit/Button';
```

See the full list of components below:

# Components by Type

- [Charts and Graphs](#charts-and-graphs)
- [Data and Utilities](#data-and-utilities)
- [Glyphs](#glyphs)

## Charts and Graphs

- [Bar](#bar)
- [Donut](#donut)
- [Histogram](#histogram)
- [Scatter](#scatter)

### Bar

```js
import Bar from 'dce-reactkit/Bar'
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
title | string | the title of the chart | `null`
data | bars[] | the bar data to show: array of `{ name [string or number], value [number], color [string, overrides default color]}` where color is optional | **required**
color | string | the default css color for the bars (e.g. '#123456' or 'white') | blue
width | string or number | the css width of the chart (e.g. '100%' or 50) | `100%`
height | string or number | the css height of the chart (e.g. '100%' or 50) | `500px`
nameLabel | string | the label for the name axis (the axis that displays the names of the bars) | `Name`
nameUnit | string | the unit for the name axis (the axis that displays the names of the bars) | `null`
valueLabel | string | the label for the value axis (the axis along which the bars lie) | `Value`
valueUnit | string | the unit for the value axis (the axis along which the bars lie) | `null`
horizontal | boolean | if true, the bar chart is a horizontal bar chart (bars lie horizontally) | `false`
noTooltipOnHover | boolean | if true, no tooltip is displayed when the user mouses over the chart | `false`
showLegend | boolean | if true, legend is included | `false`
noDownload | boolean | if true, no download button is shown | `false`
csvContents | string | the contents of the csv file to download (we auto-generate a csv from the data if this is excluded) | `auto-generated csv`

### Donut

```js
import Donut from 'dce-reactkit/Donut'
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
title | string | the title of the chart | `null`
data | slice[] | an array of slices to place in the donut of the form. An array of: `{name [string or number], value [number], color [string, overrides default color]}` where color is optional | **required**
color | string | the default css color for the slices (e.g. '#123456' or 'white') or use 'assortment' for random colors | `assortment`
width | string or number | the css width of the chart (e.g. '100%' or 50) | `100%`
height | string or number | the css height of the chart (e.g. '100%' or 50) | `500px`
noTooltipOnHover | boolean | if true, no tooltip is displayed when the user mouses over the chart | `false`
showLegend | boolean | if true, legend is included | `false`
noDownload | boolean | if true, no download button is shown | `false`

### Histogram

```js
import Histogram from 'dce-reactkit/Histogram'
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
title | string | the title of the chart | `null`
data | number[] | an array of numbers to chart in the histogram (they are sorted and put into buckets) | **required**
color | string | the default css color for the bars (e.g. '#123456' or 'white') | blue
width | string or number | the css width of the chart (e.g. '100%' or 50) | `100%`
height | string or number | the css height of the chart (e.g. '100%' or 50) | `500px`
startValue | number | the lowest value to start at (beginning of the first bucket) | `0`
endValue | number | the highest valueto count (ending of the last bucket) | `null (infinity)`
numBuckets | number | the number of buckets to divide the data into | 10
numDecimals | number | the number of decimals to display on the bucket axis. We recommend keeping this low for better formatting | `1`
bucketLabel | string | the label for the bucket axis | `Bucket`
bucketUnit | string | the unit for the bucket axis | `null`
valueLabel | string | the label for the value axis | `Num in Bucket`
valueUnit | string | the unit for the value axis | `null`
noTooltipOnHover | boolean | if true, no tooltip is displayed when the user mouses over the chart | `false`
showLegend | boolean | if true, legend is included | `false`
noDownload | boolean | if true, no download button is shown | `false`

### Scatter

```js
import Scatter from 'dce-reactkit/Scatter'
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
title | string | the title of the chart | `null`
data | point[] | an array of points to plot. Array of: `{x [number], y [number]}` | **required**
color | string | the default css color for the points (e.g. '#123456' or 'white') | blue
width | string or number | the css width of the chart (e.g. '100%' or 50) | `100%`
height | string or number | the css height of the chart (e.g. '100%' or 50) | `500px`
xLabel | string | label for the x axis | `x-axis`
xUnit | string | unit for the x axis | `null`
yLabel | string | label for the y axis | `y-axis`
yUnit | string | unit for the y axis | `null`
seriesName | string | the name of the series (included and required for the legend if `showLegend` is true) | `Chart`
noTooltipOnHover | boolean | if true, no tooltip is displayed when the user mouses over the chart | `false`
showLegend | boolean | if true, legend is included | `false`
noDownload | boolean | if true, no download button is shown | `false`

## Data and Utilities

- [DownloadButton](#downloadbutton)

### DownloadButton

```js
import DownloadButton from 'dce-reactkit/DownloadButton';
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
text | string | text of the download button | `Download`
filename | string | the name of the file once it's downloaded | **required**
contents | string | the contents of the file to download | **required**
large | boolean | if true, button is a bootstrap button | `false`
marginLeft | number | the left margin of the button | `null`
marginRight | number | the right margin of the button | `null`
marginTop | number | the top margin of the button | `null`
marginBottom | number | the bottom margin of the button | `null`

## Glyphs

To import glyphs, use the `glyph` subfolder:

```js
// Example:
import Arrow from 'dce-reactkit/glyph/Arrow';
```

Full list of glyphs:

- [Adjust](#adjust)
- [Angle](#angle)
- [Archive](#archive)
- [Arrow](#arrow)
- [ArrowsHorizontal](#arrowshorizontal)
- [ArrowsVertical](#arrowsvertical)
- [Award](#award)
- [Ban](#ban)
- [Barcode](#barcode)
- [Bed](#bed)
- [Bell](#bell)
- [Bolt](#bolt)
- [Bookmark](#bookmark)
- [Bug](#bug)
- [Calendar](#calendar)
- [Check](#check)
- [Checkbox](#checkbox)
- [Chevron](#chevron)
- [Circle](#circle)
- [Cog](#cog)
- [DoubleAngle](#doubleangle)
- [Download](#download)
- [Ellipsis](#ellipsis)
- [Envelope](#envelope)
- [File](#file)
- [IdCard](#idcard)
- [Menu](#menu)
- [Minus](#minus)
- [Move](#move)
- [Plus](#plus)
- [Square](#square)
- [Teacher](#teacher)
- [TextAlign](#textalign)
- [Times](#times)
- [WarningTriangle](#warningtriangle)

### Adjust

This component looks like Font Awesome's adjust solid icon.

```js
import Adjust from 'dce-reactkit/glyph/Adjust';
```

### Angle

This component looks like Font Awesome's angle-up/down/right/left solid icon depending on its properties.

```js
import Angle from 'dce-reactkit/glyph/Angle';
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
direction | string | the direction of the angle. Choose from `['up', 'down', 'left', 'right']` | `right`

### Archive

This component looks like Font Awesome's archive solid icon.

```js
import Archive from 'dce-reactkit/glyph/Archive';
```

### Arrow

This component looks like Font Awesome's arrow-up/down/right/left or arrow-circle/up/down/right/left solid icon depending on its properties.

```js
import Arrow from 'dce-reactkit/glyph/Arrow';
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
circled | boolean | if true, the arrow appears inside of a solid circle. | `false`
direction | string | the direction of the arrow. Choose from `['up', 'down', 'left', 'right']` | `right`

### ArrowsHorizontal

This component looks like Font Awesome's arrows-alt-h solid icon.

```js
import ArrowsHorizontal from 'dce-reactkit/glyph/ArrowsHorizontal';
```

### ArrowsVertical

This component looks like Font Awesome's arrows-alt-h solid icon.

```js
import ArrowsVertical from 'dce-reactkit/glyph/ArrowsVertical';
```

### Award

This component looks like Font Awesome's award solid icon.

```js
import Award from 'dce-reactkit/glyph/Award';
```

### Ban

This component looks like Font Awesome's ban solid icon.

```js
import Ban from 'dce-reactkit/glyph/Ban';
```

### Barcode

This component looks like Font Awesome's barcode solid icon.

```js
import Barcode from 'dce-reactkit/glyph/Barcode';
```

### Bed

This component looks like Font Awesome's bed solid icon.

```js
import Bed from 'dce-reactkit/glyph/Bed';
```

### Bell

This component looks like Font Awesome's bell or bell-slash icon depending on its properties.

```js
import Bell from 'dce-reactkit/glyph/Bell';
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
slashed | boolean | if true, the bell has a slash through it | `false`

### Bolt

This component looks like Font Awesome's bolt solid icon.

```js
import Bolt from 'dce-reactkit/glyph/Bolt';
```

### Bookmark

This component looks like Font Awesome's bookmark solid or bookmark-outlined regular icon depending on its properties.

```js
import Bookmark from 'dce-reactkit/glyph/Bookmark';
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
outlined | boolean | if true, the bookmark is outlined instead of filled | `false`

### Bug

This component looks like Font Awesome's bug solid icon.

```js
import Bug from 'dce-reactkit/glyph/Bug';
```

### Calendar

This component looks like Font Awesome's calendar solid icon.

```js
import Calendar from 'dce-reactkit/glyph/Calendar';
```

### Check

This component looks like Font Awesome's check solid icon.

```js
import Check from 'dce-reactkit/glyph/Check';
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
grow | number | the multiplicity to grow the checkmark by (if set to 2, we will apply bootstrap's 'grow-2' class) | `null`

### Checkbox

This component looks like Font Awesome's square or check-square solid icon depending upon its properties.

```js
import Checkbox from 'dce-reactkit/glyph/Checkbox';
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
checked | boolean | if true, the checkbox is checked | `false`
grow | number | the multiplicity to grow the checkbox by (if set to 2, we will apply bootstrap's 'grow-2' class) | `null`

### Chevron

This component looks like Font Awesome's chevron-up/down/right/left or chevron-circle/up/down/right/left solid icon depending on its properties.

```js
import Chevron from 'dce-reactkit/glyph/Chevron';
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
circled | boolean | if true, the arrow appears inside of a solid circle. | `false`
direction | string | the direction of the chevron. Choose from `['up', 'down', 'left', 'right']` | `right`

### Circle

This component looks like Font Awesome's circle solid icon.

```js
import Circle from 'dce-reactkit/glyph/Circle';
```

### Cog

This component looks like Font Awesome's cog solid icon.

```js
import Cog from 'dce-reactkit/glyph/Cog';
```

### DoubleAngle

This component looks like Font Awesome's angle-double-up/down/right/left solid icon depending on its properties.

```js
import DoubleAngle from 'dce-reactkit/glyph/DoubleAngle';
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
direction | string | the direction of the double angle. Choose from `['up', 'down', 'left', 'right']` | `right`

### Download

This component looks like Font Awesome's cloud-download-alt solid icon.

```js
import Download from 'dce-reactkit/glyph/Download';
```

### Ellipsis

This component looks like Font Awesome's ellipsis-h/v solid icon depending upon its properties.

```js
import Ellipsis from 'dce-reactkit/glyph/Ellipsis';
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
vertical | boolean | if true, the ellipsis is vertical | `false`

### Envelope

This component looks like Font Awesome's envelope solid icon.

```js
import Envelope from 'dce-reactkit/glyph/Envelope';
```

### File

This component looks like Font Awesome's file or file-csv solid icon depending upon its properties.

```js
import File from 'dce-reactkit/glyph/File';
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
type | string | the file type. Supported values: `['csv', null]` | `null`

### IdCard

This component looks like Font Awesome's id-card solid icon.

```js
import IdCard from 'dce-reactkit/glyph/IdCard';
```

### Menu

This component looks like Font Awesome's bars solid icon.

```js
import Menu from 'dce-reactkit/glyph/Menu';
```

### Minus

This component looks like Font Awesome's minus solid icon.

```js
import Minus from 'dce-reactkit/glyph/Minus';
```

### Move

This component looks like Font Awesome's arrows-alt solid icon.

```js
import Move from 'dce-reactkit/glyph/move';
```

### Plus

This component looks like Font Awesome's plus solid icon.

```js
import Plus from 'dce-reactkit/glyph/Plus';
```

### Square

This component looks like Font Awesome's square-filled solid or square regular icon depending upon its properties.

```js
import Adjust from 'dce-reactkit/glyph/Adjust';
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
filled | boolean | if true, the square is filled | `false`
grow | number | the multiplicity to grow the square by (if set to 2, we will apply bootstrap's 'grow-2' class) | `null`

### Teacher

This component looks like Font Awesome's chalkboard-teacher solid icon.

```js
import Teacher from 'dce-reactkit/glyph/Teacher';
```

### TextAlign

This component looks like Font Awesome's align-center/left/right/justify solid icon depending upon its properties.

```js
import TextAlign from 'dce-reactkit/glyph/TextAlign';
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
left | boolean | if true, we display the align left icon | `true`
right | boolean | if true, we display the align right icon | `false`
justify | boolean | if true, we display the justify align icon | `false`
center | boolean | if true, we display the align center icon | `false`

### Times

This component looks like Font Awesome's times solid icon.

```js
import Times from 'dce-reactkit/glyph/Times';
```

Customize this component by setting its properties:

Property Name | Type | Description | Required/Default Value
:--- | :--- | :--- | :--
grow | number | the multiplicity to grow the times icon by (if set to 2, we will apply bootstrap's 'grow-2' class) | `null`

### WarningTriangle

This component looks like Font Awesome's exclamation-triangle solid icon.

```js
import WarningTriangle from 'dce-reactkit/glyph/WarningTriangle';
```