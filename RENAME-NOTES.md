# TwoLumi brand update

This build uses the **TwoLumi** brand everywhere in the application.

Also included:
- Next.js updated to 15.5.18
- CSS `align-items: flex-end` compatibility fix
- `.env.example` prepared for `https://twolumi.com`
- SEO route slugs preserved because they target search intent, not the brand name

After replacing your local files, run:

```powershell
npm.cmd install
npm.cmd run build
```

Then commit and push:

```powershell
git add .
git commit -m "Rename brand to TwoLumi"
git push
```
