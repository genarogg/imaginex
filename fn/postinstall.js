const fs = require('fs');
const path = require('path');

/**
 * Mueve automáticamente la carpeta API a la ubicación correcta según la estructura de Next.js
 */
function moveApiFolder() {
  // Solo ejecutar en desarrollo
  if (isProduction()) {
    console.log('🏭 Entorno de producción detectado - saltando configuración de API');
    return true;
  }

  // Encontrar la raíz del proyecto (donde está package.json)
  const projectRoot = findProjectRoot();
  const sourceApiPath = path.join(__dirname, '..', 'src', 'app', 'api');
  
  // Verificar si la carpeta API fuente existe, si no, crearla
  if (!fs.existsSync(sourceApiPath)) {
    console.log('❌ No se encontró la carpeta API en la ubicación esperada:', sourceApiPath);
    console.log('🛠️ Creando carpeta API en la ubicación esperada...');
    fs.mkdirSync(sourceApiPath, { recursive: true });
    console.log('✅ Carpeta API creada exitosamente:', sourceApiPath);
  }

  // Posibles ubicaciones de destino ordenadas por prioridad (desde la raíz del proyecto)
  const possibleDestinations = [
    // Estructura con src/app (más común en proyectos nuevos)
    path.join(projectRoot, 'src/app/api'),
    // Estructura con app en raíz
    path.join(projectRoot, 'app/api'),
    // Estructura con src/pages (menos común pero posible)
    path.join(projectRoot, 'src/pages/api'),
    // Estructura con pages en raíz
    path.join(projectRoot, 'pages/api')
  ];

  let targetPath = null;

  // Buscar la estructura correcta del proyecto
  for (const destination of possibleDestinations) {
    const parentDir = path.dirname(destination);
    
    // Verificar si el directorio padre existe (src/app, app, src/pages, pages)
    if (fs.existsSync(parentDir)) {
      targetPath = destination;
      console.log(`✅ Estructura detectada: ${path.relative(projectRoot, parentDir)}`);
      break;
    }
  }

  if (!targetPath) {
    console.log('❌ No se pudo detectar una estructura válida de Next.js (app o pages)');
    console.log('Estructuras buscadas:');
    possibleDestinations.forEach(dest => {
      const parentDir = path.dirname(dest);
      const relativePath = path.relative(projectRoot, parentDir);
      console.log(`  - ${relativePath} (${fs.existsSync(parentDir) ? 'existe' : 'no existe'})`);
    });
    return false;
  }

  try {
    // Si el destino ya existe, preguntar si sobrescribir o hacer backup
    if (fs.existsSync(targetPath)) {
      console.log(`⚠️  La carpeta de destino ya existe: ${targetPath}`);
      
      // Crear backup de la carpeta existente
      const backupPath = `${targetPath}_backup_${Date.now()}`;
      fs.renameSync(targetPath, backupPath);
      console.log(`📦 Backup creado: ${backupPath}`);
    }

    // Asegurar que el directorio padre existe
    const parentDir = path.dirname(targetPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }

    // Mover la carpeta
    moveDirectory(sourceApiPath, targetPath);
    
    console.log(`✅ Carpeta API movida exitosamente de:`);
    console.log(`   ${sourceApiPath}`);
    console.log(`   a: ${targetPath}`);
    
    return true;

  } catch (error) {
    console.error('❌ Error al mover la carpeta API:', error.message);
    return false;
  }
}

/**
 * Encuentra la raíz del proyecto (donde está el package.json principal)
 */
function findProjectRoot() {
  let currentDir = process.cwd();
  
  // Si estamos ejecutando desde node_modules, ir hacia arriba
  if (currentDir.includes('node_modules')) {
    // Buscar el primer directorio que contenga package.json y que NO esté en node_modules
    let searchDir = currentDir;
    while (searchDir !== path.dirname(searchDir)) {
      if (searchDir.includes('node_modules')) {
        searchDir = path.dirname(searchDir);
        continue;
      }
      
      if (fs.existsSync(path.join(searchDir, 'package.json'))) {
        return searchDir;
      }
      
      searchDir = path.dirname(searchDir);
    }
  }
  
  // Si no estamos en node_modules, buscar package.json hacia arriba
  while (currentDir !== path.dirname(currentDir)) {
    if (fs.existsSync(path.join(currentDir, 'package.json'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  
  // Fallback al directorio actual
  return process.cwd();
}

/**
 * Detecta si estamos en un entorno de producción
 */
function isProduction() {
  // Método 1: Variable de entorno NODE_ENV
  if (process.env.NODE_ENV === 'production') {
    return true;
  }

  // Método 2: Detectar si estamos en un entorno CI/CD
  if (process.env.CI || process.env.CONTINUOUS_INTEGRATION) {
    return true;
  }

  // Método 3: Detectar instalación con --production
  if (process.env.npm_config_production === 'true') {
    return true;
  }

  // Método 4: Verificar si node_modules contiene solo dependencias de producción
  try {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      // Si hay devDependencies en package.json pero no en node_modules, es producción
      if (packageJson.devDependencies) {
        const nodeModulesPath = path.resolve(process.cwd(), 'node_modules');
        if (fs.existsSync(nodeModulesPath)) {
          // Verificar si alguna devDependency está instalada
          const devDeps = Object.keys(packageJson.devDependencies);
          const installedDevDeps = devDeps.filter(dep => 
            fs.existsSync(path.join(nodeModulesPath, dep))
          );
          
          // Si no hay devDependencies instaladas, es producción
          if (installedDevDeps.length === 0 && devDeps.length > 0) {
            return true;
          }
        }
      }
    }
  } catch (error) {
    // Ignorar errores de lectura de package.json
  }

  // Método 5: Detectar plataformas de deployment comunes
  const productionPlatforms = [
    'VERCEL',
    'NETLIFY',
    'HEROKU',
    'AWS_LAMBDA_FUNCTION_NAME',
    'RAILWAY',
    'RENDER'
  ];

  if (productionPlatforms.some(platform => process.env[platform])) {
    return true;
  }

  return false;
}

/**
 * Función auxiliar para mover un directorio completo
 */
function moveDirectory(source, destination) {
  // Crear directorio de destino si no existe
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Leer contenido del directorio fuente
  const items = fs.readdirSync(source);

  items.forEach(item => {
    const sourcePath = path.join(source, item);
    const destPath = path.join(destination, item);

    const stats = fs.statSync(sourcePath);

    if (stats.isDirectory()) {
      // Recursivamente mover subdirectorios
      moveDirectory(sourcePath, destPath);
    } else {
      // Mover archivos
      fs.copyFileSync(sourcePath, destPath);
    }
  });

  // Eliminar directorio fuente después de mover todo
  fs.rmSync(source, { recursive: true, force: true });
}

/**
 * Función para detectar la estructura del proyecto Next.js
 */
function detectNextStructure() {
  const projectRoot = findProjectRoot();
  const structures = [
    { path: path.join(projectRoot, 'src/app'), name: 'src/app (App Router)' },
    { path: path.join(projectRoot, 'app'), name: 'app (App Router)' },
    { path: path.join(projectRoot, 'src/pages'), name: 'src/pages (Pages Router)' },
    { path: path.join(projectRoot, 'pages'), name: 'pages (Pages Router)' }
  ];

  console.log('🔍 Detectando estructura del proyecto Next.js...');
  console.log(`📁 Raíz del proyecto: ${projectRoot}`);
  console.log('');
  
  structures.forEach(structure => {
    const exists = fs.existsSync(structure.path);
    const relativePath = path.relative(projectRoot, structure.path);
    console.log(`  ${exists ? '✅' : '❌'} ${structure.name}: ./${relativePath}`);
  });
}

// Función principal que se puede llamar desde package.json scripts
function main() {
  // Verificación inicial de entorno
  if (isProduction()) {
    console.log('🏭 Entorno de producción detectado');
    console.log('⏭️  Saltando configuración de API - esto es normal en producción');
    return;
  }

  console.log('🚀 Iniciando instalación de la librería...');
  console.log('📁 Moviendo carpeta API a la ubicación correcta...\n');
  
  // Detectar estructura (opcional, para debug)
  detectNextStructure();
  console.log('');
  
  // Mover la carpeta
  const success = moveApiFolder();
  
  if (success) {
    console.log('\n🎉 ¡Instalación completada exitosamente!');
    console.log('💡 Tu carpeta API está lista para usar en tu proyecto Next.js');
  } else {
    console.log('\n❌ La instalación no se pudo completar automáticamente');
    console.log('📖 Por favor, mueve manualmente la carpeta API a la ubicación correcta:');
    console.log('   - Para App Router: src/app/api o app/api');
    console.log('   - Para Pages Router: src/pages/api o pages/api');
  }
}

// Exportar funciones para uso programático
module.exports = {
  moveApiFolder,
  detectNextStructure,
  isProduction,
  findProjectRoot,
  main
};

// Si se ejecuta directamente (no como módulo)
if (require.main === module) {
  main();
}