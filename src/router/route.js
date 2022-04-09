import list from './nav';
const route = {};

list.forEach(item => {
    route[item.path] = item.file
});

export default route