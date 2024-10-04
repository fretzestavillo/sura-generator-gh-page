# Sura Generator

This project combines React and webpack for front end, Google App Script for back end also for handling API and Google Sheet for data persistent. You can visit here: https://fretzestavillo.github.io/sura-generator-gh-page/

## Getting Started

To set up the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/fretzestavillo/sura-generator-gh-page.git
```

2. Change Directory:

```bash
cd sura-generator-gh-page.git/
```

3. Remove the existing git:

```bash
rm -rf .git
```

4. Install the dependencies

```bash
npm install
```

5. Create repository in Github

6. apps/web/webpack.config.js

```
process.env['NODE_ENV'] === 'production'? '/<replace with your  repository name>/'
```

7. Command to connect local repository to remote repository

```
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin <replace with your github repository>
git push -u origin main
```

8. Development

```bash
npm run dev
```

9. Deployment

```bash
 npm run deploy
```

10. Enable website link

11. Go to your github and click the settings

![alt text](assets/3.png)

12. Then click the check box and save

![alt text](assets/1.png)

13. You can now click the link to view the website hosted by github

![alt text](assets/2.png)
