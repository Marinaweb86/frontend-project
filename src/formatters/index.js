import formatStylish from './stylish.js';
import formatPlain from './plain.js';

export default (diff, formatName = 'stylish') => {
  const formatters = {
    stylish: formatStylish,
    plain: formatPlain,
  };

  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}`);
  }

  return formatters[formatName](diff);
};