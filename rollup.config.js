import babel from 'rollup-plugin-babel';

export default {
  entry: 'lib/ethAbi.js',
  dest: 'index.js',
  moduleName: 'EthAbi',
  format: 'cjs',
  plugins: [babel({
    babelrc: false,
    presets: ['es2015-rollup', 'stage-0'],
    runtimeHelpers: true
  })]
};
