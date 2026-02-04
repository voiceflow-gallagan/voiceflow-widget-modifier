# Assets

Visual references and demos for widget modifications.

## Why HTML Demos Instead of Screenshots?

The Claude Browser extension can capture screenshots for real-time verification during development, but **cannot save them directly to local files**.

Instead, we create **HTML demo files** that:
- Visually demonstrate the before/after effect
- Can be opened in any browser to see the change
- Are version-controlled alongside the code
- Don't require external image hosting

## Files

| File | Description |
|------|-------------|
| `input-focus-red-border-demo.html` | Shows blue vs red focus ring on input |

## Creating New Demo Files

When adding a new modification:

1. Create `{modification-name}-demo.html`
2. Use simple HTML/CSS to simulate the widget element
3. Show both "before" (default) and "after" (modified) states side-by-side
4. Include the CSS code snippet in the demo

### Template Structure

```html
<!DOCTYPE html>
<html>
<head>
  <title>{Modification Name} Demo</title>
  <style>
    /* Simulate the widget element */
    /* Show before/after states */
  </style>
</head>
<body>
  <h1>{Modification Name}</h1>
  <div class="demo-container">
    <div class="before"><!-- Default state --></div>
    <div class="after"><!-- Modified state --></div>
  </div>
</body>
</html>
```

## Test URL

For live testing with the actual widget:
```
https://creator.voiceflow.com/share/696e5862c51f60cfb9cdafca/development
```
