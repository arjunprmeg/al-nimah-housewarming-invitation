# AL – NIMAH housewarming invitation

English and Malayalam invitation with music, directions, a live countdown, calendar download, and sharing.

## Local preview

Use Node.js 24, then run:

```sh
npx --yes pnpm@12.3.4 install
npm run dev
```

Open http://localhost:3000. The welcome screen stays open until a guest taps **Open Invitation**. Music starts with that tap. Use the **Music** button to pause or resume.

## Free GitHub Pages hosting

1. Push this project to the `main` branch of a public GitHub repository.
2. In the repository, open **Settings → Pages → Build and deployment**, then choose **GitHub Actions**.
3. Run **Deploy invitation to GitHub Pages** from the Actions tab if it has not already run.
4. Open the URL shown by the successful deployment.

The workflow handles the repository URL prefix for images, audio, icons, and scripts. Future pushes to `main` publish updates automatically.

For a manual static build, run `npm run build`. The generated website is in `out/`. Set `NEXT_PUBLIC_BASE_PATH=/your-repository-name` before building for a repository subpath.

The soundtrack is `public/invitation-music.mp3`; the backdrop is `public/courtyard-backdrop.png`.
