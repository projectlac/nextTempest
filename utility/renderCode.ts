export const renderCode = (str: string) => {
  var nuaDau = str.slice(0, Math.floor(str.length / 2))
  return `${nuaDau}******`;
}