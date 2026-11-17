const { render } = require('@testing-library/react');
const React = require('react');

// Simple test to check perspective origin
const TestComponent = () => {
  return React.createElement('div', {
    style: { perspectiveOrigin: '50% 50%' }
  }, 'Test');
};

const { container } = render(React.createElement(TestComponent));
const div = container.firstChild;

console.log('Element:', div.outerHTML);
console.log('Style object:', div.style);
console.log('perspectiveOrigin:', div.style.perspectiveOrigin);
console.log('perspective-origin:', div.style['perspective-origin']);
