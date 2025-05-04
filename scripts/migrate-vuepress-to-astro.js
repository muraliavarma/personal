#!/usr/bin/env node
/**
 * Simple script to help migrate content from VuePress to Astro
 * 
 * Usage: 
 * 1. Install script dependencies: npm install fs-extra path glob front-matter
 * 2. Run: node scripts/migrate-vuepress-to-astro.js
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const matter = require('front-matter');

// Paths configuration
const VUEPRESS_DIR = path.resolve(process.cwd(), '../.vuepress');  // Source VuePress dir
const VUEPRESS_COMPONENTS_DIR = path.resolve(VUEPRESS_DIR, 'components');
const ASTRO_SRC_DIR = path.resolve(process.cwd(), 'src');
const ASTRO_COMPONENTS_DIR = path.resolve(ASTRO_SRC_DIR, 'components');
const ASTRO_CONTENT_DIR = path.resolve(ASTRO_SRC_DIR, 'content');

// Create necessary directories
console.log('Creating directories...');
fs.ensureDirSync(ASTRO_COMPONENTS_DIR);
fs.ensureDirSync(ASTRO_CONTENT_DIR);
fs.ensureDirSync(path.resolve(ASTRO_CONTENT_DIR, 'projects'));

// Migrate Vue components to Astro
console.log('Migrating Vue components to Astro...');
const vueFiles = glob.sync('*.vue', { cwd: VUEPRESS_COMPONENTS_DIR });

vueFiles.forEach(vueFile => {
  const componentName = path.basename(vueFile, '.vue');
  const sourcePath = path.resolve(VUEPRESS_COMPONENTS_DIR, vueFile);
  const targetPath = path.resolve(ASTRO_COMPONENTS_DIR, `${componentName}.astro`);
  
  if (fs.existsSync(targetPath)) {
    console.log(`  • Skipping ${componentName} (already exists)`);
    return;
  }
  
  console.log(`  • Converting ${vueFile} to ${componentName}.astro`);
  const vueContent = fs.readFileSync(sourcePath, 'utf-8');
  
  // Very basic conversion - in a real scenario, you'd want more sophisticated parsing
  const template = vueContent.match(/<template>([\s\S]*?)<\/template>/)?.[1] || '';
  const script = vueContent.match(/<script>([\s\S]*?)<\/script>/)?.[1] || '';
  const style = vueContent.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] || '';
  
  // Extract props from script
  const propsMatch = script.match(/props\s*:\s*\[([\s\S]*?)\]/) || 
                    script.match(/props\s*:\s*\{([\s\S]*?)\}/);
  
  const propNames = [];
  if (propsMatch && propsMatch[1]) {
    // Handle array props format ['prop1', 'prop2']
    const arrayProps = propsMatch[1].match(/'([^']+)'/g) || propsMatch[1].match(/"([^"]+)"/g);
    if (arrayProps) {
      arrayProps.forEach(prop => {
        propNames.push(prop.replace(/['"]/g, ''));
      });
    }
    
    // Handle object props format { prop1: String, prop2: { type: Boolean } }
    const objectProps = propsMatch[1].match(/(\w+)\s*:/g);
    if (objectProps) {
      objectProps.forEach(prop => {
        propNames.push(prop.replace(':', '').trim());
      });
    }
  }
  
  // Create Astro component
  let astroContent = '---\n';
  if (propNames.length) {
    astroContent += 'interface Props {\n';
    propNames.forEach(prop => {
      astroContent += `  ${prop}?: any;\n`;
    });
    astroContent += '}\n\n';
    astroContent += `const { ${propNames.join(', ')} } = Astro.props;\n`;
  }
  astroContent += '---\n\n';
  
  // Add the template (replacing Vue directives with Astro equivalents where possible)
  let processedTemplate = template
    .replace(/v-for="([^"]+) in ([^"]+)"/g, '{$2.map(($1) => (')
    .replace(/v-if="([^"]+)"/g, '{$1 && (')
    .replace(/<\/[\w-]+>(\s*)<\/[\w-]+>/g, '</$1</Fragment>})')
    .replace(/<\/[\w-]+>(\s*)$/g, '</$1})')
    .replace(/{{ /g, '{')
    .replace(/ }}/g, '}');
  
  astroContent += processedTemplate + '\n\n';
  
  // Add the style
  if (style) {
    astroContent += '<style>\n' + style + '\n</style>';
  }
  
  fs.writeFileSync(targetPath, astroContent);
});

// Migrate Markdown content (README.md is often the main page in VuePress)
console.log('Migrating Markdown content...');
const readmePath = path.resolve(process.cwd(), '../README.md');

if (fs.existsSync(readmePath)) {
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');
  
  // Parse frontmatter
  const { attributes, body } = matter(readmeContent);
  
  // Process content to extract projects
  const projectMatches = body.match(/<ProjectItem[\s\S]*?<\/ProjectItem>/g) || [];
  
  if (projectMatches.length) {
    console.log(`  • Found ${projectMatches.length} projects to extract`);
    
    projectMatches.forEach((projectMatch, index) => {
      // Try to extract title from h2 before the ProjectItem
      const h2Match = body.substring(0, body.indexOf(projectMatch)).match(/<h2[^>]*>([^<]+)<\/h2>\s*$/);
      const title = h2Match ? h2Match[1].trim() : `Project ${index + 1}`;
      
      // Extract tags
      const tagsMatch = projectMatch.match(/:tags="\\['([^\\]]+)'\\]"/) || 
                        projectMatch.match(/:tags="\['([^\\]]+)'\]"/);
      const tags = tagsMatch ? tagsMatch[1].split("', '") : [];
      
      // Extract URL link if present
      const urlLinkMatch = projectMatch.match(/url-link="([^"]+)"/);
      const urlLink = urlLinkMatch ? urlLinkMatch[1] : '';
      
      // Extract URL text if present
      const urlTextMatch = projectMatch.match(/url-text="([^"]+)"/);
      const urlText = urlTextMatch ? urlTextMatch[1] : '';
      
      // Extract description
      const descriptionMatch = projectMatch.match(/<div slot="description">([\s\S]*?)<\/div>/);
      const description = descriptionMatch ? descriptionMatch[1].trim() : '';
      
      // Extract image
      const imageMatch = projectMatch.match(/<img slot="image" src="([^"]+)"/);
      const image = imageMatch ? imageMatch[1].replace('./assets/', '/assets/') : '';
      
      // Create content file
      const contentPath = path.resolve(
        ASTRO_CONTENT_DIR, 
        'projects', 
        `${title.toLowerCase().replace(/[\s:]+/g, '-')}.md`
      );
      
      const content = `---
title: ${title}
tags: [${tags.map(t => `'${t}'`).join(', ')}]
${urlLink ? `urlLink: ${urlLink}\n` : ''}${urlText ? `urlText: ${urlText}\n` : ''}${image ? `image: ${image}\n` : ''}sortOrder: ${index + 1}
---

${description.replace(/<br\s*\/?><br\s*\/?>/g, '\n\n')}
`;
      
      fs.writeFileSync(contentPath, content);
      console.log(`  • Created content file for ${title}`);
    });
  }
}

console.log('\nMigration script completed!');
console.log('Note: This is a basic migration. You may need to manually adjust some components and content.');
console.log('Next steps:');
console.log('1. Check your Astro components in src/components');
console.log('2. Review your content in src/content/projects');
console.log('3. Make sure all image paths are correct in your content');
console.log('4. Update your nav links and page structure as needed'); 