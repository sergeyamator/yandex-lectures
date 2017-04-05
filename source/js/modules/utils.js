export default {
  indexOf: (parentSelector, childSelector) => {
    const nodes = Array.prototype.slice.call(parentSelector.children);

    return nodes.indexOf(childSelector);
  }
}