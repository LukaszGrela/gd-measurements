# GrelaDesign Measurement components

Set of React components to add measurement means to your components for debugging purpose.

[Example page on github.io](https://lukaszgrela.github.io/gd-measurements/)

## Installation

```
npm i gd-measurements
```

## Stylesheet

```
import 'gd-measurements/dist/gd-measurements.css';
```

Required for the components to render properly (positioning) and basic style.

## Grid

Creates a Grid of lines at given or predefined interval, by default every 10px sub division and every 50px main division.

### Parameters

#### `position?: TPosition`

Allows to specify one of 2 possible positions: `fixed` or `absolute`. Default is `fixed`.

- The `absolute` value should be used to put `Grid` in some container (**note:** container needs to have `position: relative` applied).
- The `fixed` position should be used when `Grid` is placed at top level of the DOM structure.

#### `grid?: TGrid`

Allows to specify the grid size features. Defaults to `{ width: 50, height: 50 }`.

- `width` - Specifies the horizontal grid step (default: `50`).
- `height` - Specifies the vertical grid step (default: `50`).
- `subdivision?` - Specifies how many divisions the grid step has (default: `5`).

#### `labels?: boolean | TUnits`

Allows to configure the grid ruler labels. Can be a boolean to enable/disable labels, or an object with the following properties:

- `hOffset` - Offset of horizontal labels (number or `TPoint`).
- `vOffset` - Offset of vertical labels (number or `TPoint`).
- `zero?` - Zero label offset (number or `TPoint`).
- `size?` - Size of the label step.
- `vLabelConfig?` - Configuration of the vertical labels.
- `hLabelConfig?` - Configuration of the horizontal labels.
- `labelZeroConfig?` - Configuration of the zero label.

#### `debug?: boolean`

When `true`, displays debug information. Default is `false`.

### Usage Example

```tsx
import { Grid } from 'gd-measurements';

// Basic grid with default settings (fixed position)
<Grid position="fixed" />

// Grid with custom size and subdivisions in a container
<div style={{ position: 'relative', width: '800px', height: '600px' }}>
  <Grid
    position="absolute"
    grid={{ width: 100, height: 100, subdivision: 10 }}
  />
  {/* Your content here */}
</div>

// Grid with labels
<Grid
  position="fixed"
  grid={{ width: 50, height: 50 }}
  labels={{
    hOffset: { x: 2, y: 0 },
    vOffset: { x: 0, y: -2 },
    zero: { x: 12, y: 0 },
    size: { width: 50, height: 50 }
  }}
/>

// Grid with debug mode in a container
<div style={{ position: 'relative', width: '400px', height: '400px' }}>
  <Grid position="absolute" debug />
  {/* Your content here */}
</div>
```

### CSS Override

To override pattern color you need to apply new style to the following CSS classes:

- `.Grid_pattern_main` - main grid stroke color
- `.Grid_pattern_sub` - subdivision grid stroke color
- `.Grid .Grid_units .value-label` - label fill color

## Ruler

Creates a ruler component with given or predefined interval, by default every 100px divisions with 10 subdivisions.

### Parameters

#### `position?: TPosition`

Allows to specify one of 2 possible positions: `fixed` or `absolute`. Default is `fixed`.

- The `absolute` value should be used to put `Ruler` in some container (**note:** container needs to have `position: relative` applied).
- The `fixed` position should be used when `Ruler` is placed at top level of the DOM structure.

#### `location?: TLocation`

Allows to specify one of 4 possible placements: `top`, `right`, `bottom`, and `left`. Default is `top`.

#### `size?: number`

Size of the main division. Default is `100`.

#### `subdivisions?: number`

Number of subdivisions. Default is `10`.

#### `width?: number`

Width of the ruler. Default is `25`.

#### `edge?: number`

Width of the edge line. Default is `3`. Maximum value is the `width`.

#### `mainTickWidth?: number`

Width of the main tick. Default is the `width`. Maximum value is the `width`.

#### `tickWidth?: number`

Width of the subdivision tick. Default is `10`. Maximum value is the `width`.

#### `showHalfTick?: boolean`

When `true`, the half size tick is rendered. Default is `true`.

#### `halfTickWidth?: number`

Width of the subdivision tick that is in the middle of `size`. Default is `20`. Maximum value is the `width`.

#### `labels?: boolean | TUnit`

Allows to configure the ruler labels. Can be a boolean to enable/disable labels, or an object with the following properties:

- `offset?` - Offset of labels (number or `TPoint`). x is distance from the tick, y is distance from the ruler's edge.
- `zero?` - Zero label offset (number or `TPoint`). x is distance from the tick, y is distance from the ruler's edge.
- `size?` - Size of the label step.
- `labelConfig?` - Configuration for the tick labels.
- `labelZeroConfig?` - Configuration for the zero tick label.

#### `skipZero?: boolean`

Should skip the `0` label. Only applies when `labels` is set. Default is `false`.

### Usage Example

```tsx
import { Ruler } from 'gd-measurements';

// Basic vertical ruler at top (fixed position)
<Ruler position="fixed" />

// Horizontal ruler at left in a container
<div style={{ position: 'relative', width: '600px', height: '400px' }}>
  <Ruler
    position="absolute"
    location="left"
    size={100}
    subdivisions={10}
    width={25}
  />
  {/* Your content here */}
</div>

// Ruler with labels (fixed position)
<Ruler
  position="fixed"
  location="top"
  labels={{
    offset: { x: 0, y: 10 },
    zero: { x: 0, y: 20 },
    size: 100
  }}
/>

// Ruler with custom ticks and labels in a container
<div style={{ position: 'relative', width: '500px', height: '300px' }}>
  <Ruler
    position="absolute"
    location="bottom"
    size={100}
    subdivisions={10}
    tickWidth={8}
    halfTickWidth={15}
    showHalfTick={true}
    labels={true}
    skipZero={true}
  />
  {/* Your content here */}
</div>
```

### CSS Override

To override pattern color you need to apply new style to the following CSS classes:

- `.Ruler_pattern_line` - ruler's edge fill color
- `.Ruler_pattern_main` - ruler's main line stroke color
- `.Ruler_pattern_sub` - ruler's subdivision line stroke color
- `.Ruler .Ruler_units .value-label` - label fill color

## Axis

### AxisH

Creates a horizontal axis line at the vertical center of its container.

#### `position?: TPosition`

Allows to specify one of 2 possible positions: `fixed` or `absolute`. Default is `fixed`.

- The `absolute` value should be used to put `AxisH` in some container (**note:** container needs to have `position: relative` applied).
- The `fixed` position should be used when `AxisH` is placed at top level of the DOM structure.

#### CSS Override

To override color you need to apply new style to the following CSS classes:

- `.AxisH line` - Horizontal axis `line` stroke color

### AxisV

Creates a vertical axis line at the horizontal center of its container.

#### `position?: TPosition`

Allows to specify one of 2 possible positions: `fixed` or `absolute`. Default is `fixed`.

- The `absolute` value should be used to put `AxisV` in some container (**note:** container needs to have `position: relative` applied).
- The `fixed` position should be used when `AxisV` is placed at top level of the DOM structure.

#### CSS Override

To override color you need to apply new style to the following CSS classes:

- `.AxisV line` - Vertical axis `line` stroke color

### Usage Example

```tsx
import { AxisH, AxisV } from 'gd-measurements';

// Fixed position axes (full viewport)
<AxisH position="fixed" />
<AxisV position="fixed" />

// Absolute position axes (within a container)
<div style={{ position: 'relative', width: '500px', height: '500px' }}>
  <AxisH position="absolute" />
  <AxisV position="absolute" />
  {/* Your content here */}
</div>

// Both axes together in fixed position
<>
  <AxisH position="fixed" />
  <AxisV position="fixed" />
</>
```
