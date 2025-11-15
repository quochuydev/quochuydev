# Image Handling in MDX Files

## How to Add Images

To ensure images render correctly in both development and production:

1. **Place images in the `public` folder**
   - Create folders inside `public/` to organize your images
   - Example: `public/lemonldap/`, `public/projects/`, etc.

2. **Reference images from MDX files using absolute paths**
   ```mdx
   ![Alt text](/lemonldap/1.png)
   ![Project screenshot](/projects/screenshot.png)
   ```

   Note: Always start with `/` which refers to the public folder root.

3. **Production builds**
   - The build process automatically handles the base path (`/quochuydev/`)
   - You don't need to include the base path in your image references

## Example Structure

```
blog/
├── public/
│   ├── lemonldap/
│   │   ├── 1.png
│   │   ├── 2.png
│   │   └── ...
│   ├── multiple-oidc-session-management/
│   │   └── authentication.drawio.png
│   └── images/
│       └── ... (other images)
└── src/
    └── pages/
        └── your-page.mdx
```

## Usage in MDX

```mdx
---
title: "My Page"
---

# My Page

Here's an image:

![Authentication diagram](/multiple-oidc-session-management/authentication.drawio.png)

![LemonLDAP setup](/lemonldap/1.png)
```

## Note

If images are not rendering:
1. Check if the image file exists in the `public/` folder
2. Verify the path starts with `/`
3. Ensure the path matches the folder structure in `public/`
