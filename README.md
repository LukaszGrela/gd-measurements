# GrelaDesign Measurement components

Set of React components to add measurement means to your components for debugging purpose.

## Grid

Creates a Grid of lines at given or predefined interval, by default every 10px sub division and every 50px main division.

### Parameters

#### `position`

Allows to specify one of 2 possible `position`'s: `fixed` or `absolute`. The `absolute` value should be used to put `Grid` in some container (note: container needs to have `position: relative` applied). The `fixed` position should be used when `Grid` is placed at top level of the DOM structure. Default is `fixed`.

## Ruler

Creates a ruler component with given or predefined interval, by default every 10px sub division and every 50px main division and every 25px half main division.

### Parameters

#### `postion`

Allows to specify one of 2 possible `position`'s: `fixed` or `absolute`. The `absolute` value should be used to put `Ruler` in some container (note: container needs to have `position: relative` applied). The `fixed` position should be used when `Ruler` is placed at top level of the DOM structure. Default is `fixed`.

#### `orientation`

Allows to specify one of 2 possible values: `vertical` and `horizontal`. Default is `vertical`.

#### `location`

Allows to specify one of 4 possible placements: `top`, `right`, `bottom` and `left`. Default is `top`.
