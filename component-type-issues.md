# Component Type Issues Analysis

This document lists all properties that do not conform to the TypeScript type definitions in the provided component data.

## ComponentData Level Issues

### All Components
1. **Missing required `page` property**
   - Type: `PageData` (required in ComponentData interface)
   - Solution: Add `page` property with appropriate PageData structure

2. **Incorrect component names**
   - Expected: `'PFText'` (capital T), `'PFImage'` (capital I)
   - Actual: `'PFtext'` (lowercase t), `'PFimage'` (lowercase i)
   - Solution: Capitalize the component names

## Component-Specific Issues

### Component 1: PFtext (图层1)
```typescript
{
  id: uuidv4(),
  name: 'PFtext',
  layerName: '图层1',
  props: {
    ...textComponentProps,
    text: 'hello',
    fontSize: '20px',
    color: '#000000',
    'lineHeight': '1',      // Issue 1: Unnecessary quote wrapping
    textAlign: 'left',
    fontFamily: '',
    width: '100px',
    height: '100px',
    backgroundColor: '#efefef',
    left: '100px',
    top: '150px'
  }
}
```

#### Props Issues:
1. `'lineHeight'` - Unnecessary quote wrapping around property name
   - Solution: Remove quotes: `lineHeight: '1'`

### Component 2: PFtext (图层2)
```typescript
{
  id: uuidv4(),
  name: 'PFtext',
  layerName: '图层2',
  props: {
    ...textComponentProps,
    text: 'hello2',
    fontSize: '10px',
    fontWeight: 'bold',
    'lineHeight': '2',      // Issue 1: Unnecessary quote wrapping
    textAlign: 'left',
    fontFamily: ''
  }
}
```

#### Props Issues:
1. `'lineHeight'` - Unnecessary quote wrapping around property name
   - Solution: Remove quotes: `lineHeight: '2'`

### Component 3: PFtext (图层3)
```typescript
{
  id: uuidv4(),
  name: 'PFtext',
  layerName: '图层3',
  props: {
    ...textComponentProps,
    text: 'hello3',
    fontSize: '15px',
    actionType: 'url',
    url: ' `https://www.baidu.com` ',  // Issue 1: Incorrect string format
    'lineHeight': '3',                  // Issue 2: Unnecessary quote wrapping
    textAlign: 'left',
    fontFamily: ''
  }
}
```

#### Props Issues:
1. `url` - Incorrect string format (contains backticks)
   - Solution: Remove backticks: `url: 'https://www.baidu.com'`
2. `'lineHeight'` - Unnecessary quote wrapping around property name
   - Solution: Remove quotes: `lineHeight: '3'`

### Component 4: PFimage (图层4)
```typescript
{
  id: uuidv4(),
  name: 'PFimage',
  layerName: '图层4',
  props: {
    ...imageComponentProps,
    src: ' `http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg` ',  // Issue 1: Incorrect string format
    width: '100px'
  }
}
```

#### Props Issues:
1. `src` - Incorrect string format (contains backticks)
   - Solution: Remove backticks: `src: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg'`

## Optional Properties Check

The following properties are optional according to Partial<AllComponentProps> but are missing from most components:
- paddingLeft, paddingRight, paddingTop, paddingBottom
- borderStyle, borderColor, borderWidth, borderRadius
- boxShadow, opacity, position, right
- fontStyle, textDecoration (for text components)

These are not errors but should be noted if you need complete styling control.

## Recommendations

1. Fix the component names to match the expected type definitions
2. Add the required `page` property to all components
3. Remove unnecessary quote wrapping around property names
4. Fix string formats by removing backticks
5. Consider adding missing optional properties if needed for your design

After making these changes, the component data should conform to the TypeScript type definitions.