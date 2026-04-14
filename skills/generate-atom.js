const fs = require("fs");
const path = require("path");

const componentName = process.argv[2];

if (!componentName) {
  console.error(
    "❌ Please provide an atom name (e.g., npm run generate-atom Button).",
  );
  process.exit(1);
}

const camelCaseName =
  componentName.charAt(0).toLowerCase() + componentName.slice(1);

// Assuming your components live in 'components/atoms'
const componentsDir = path.join(
  __dirname,
  "../components/atoms",
  componentName,
);

if (fs.existsSync(componentsDir)) {
  console.error(
    `❌ Error: Component ${componentName} already exists at ${componentsDir}.`,
  );
  process.exit(1);
}

fs.mkdirSync(componentsDir, { recursive: true });

const stylesTemplate = `import { StyleSheet } from 'react-native';

export const ${camelCaseName}Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
`;

const typesTemplate = `export type ${componentName}Props = {
  // Add your props here
}
`;

const componentTemplate = `import React from 'react';
import { View } from 'react-native';
import { ${camelCaseName}Styles as styles } from './styles';
import { ${componentName}Props } from './types';

export const ${componentName} = ({}: ${componentName}Props) => {
  return (
    <View style={styles.container}>
    </View>
  );
};
`;

const indexTemplate = `export * from './types';\nexport * from './${componentName}';\n`;

fs.writeFileSync(path.join(componentsDir, "styles.ts"), stylesTemplate);
fs.writeFileSync(path.join(componentsDir, "types.ts"), typesTemplate);
fs.writeFileSync(
  path.join(componentsDir, `${componentName}.tsx`),
  componentTemplate,
);
fs.writeFileSync(path.join(componentsDir, "index.ts"), indexTemplate);

console.log(`✨ Successfully created ${componentName} at ${componentsDir}`);
