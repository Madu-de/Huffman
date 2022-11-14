/*
    By Madu
    On 13.11.2022
    GNU Affero General Public License v3.0
*/
class HuffmanNode {
    constructor(connections) {
        this.connections = connections;
        this.name = connections[0][0] + connections[1][0];
        this.count = connections[0][1] + connections[1][1];
    }
}
const word = 'MISSISSIPPI';
let [code, tree] = huffman(word, true);
console.log(code);
console.log(tree);
function huffman(word, withSpace) {
    let huffmancode = word;
    const charTable = getCharTable(word);
    const charArray = [...charTable];
    let sortedCharArray = charArray.sort((a, b) => a[1] - b[1]);
    let nodes = generateAllHuffmanNodes(sortedCharArray);
    let charToBinary = getAllCharsBinaryCode(nodes, charTable, withSpace);
    charToBinary.forEach((code, char) => {
        huffmancode = huffmancode.replaceAll(char, code);
    });
    return [huffmancode, charToBinary];
}
function generateAllHuffmanNodes(sortedCharArray) {
    let nodes = [
        new HuffmanNode([sortedCharArray[0], sortedCharArray[1]])
    ];
    sortedCharArray.splice(0, 2);
    let node = nodes[0];
    sortedCharArray.forEach(char => {
        node = new HuffmanNode([[node.name, node.count], char]);
        nodes.push(node);
    });
    return nodes;
}
function getAllCharsBinaryCode(nodes, charTable, withSpace) {
    let charToBinary = new Map();
    let reversedNodes = nodes.reverse();
    [...charTable].forEach(charCount => {
        const char = charCount[0];
        let code = '';
        reversedNodes.forEach(node => {
            if (node.connections[0][0].includes(char)) {
                code += '0';
            }
            else if (node.connections[1][0].includes(char)) {
                code += '1';
            }
        });
        charToBinary.set(char, code + (withSpace ? ' ' : ''));
    });
    return charToBinary;
}
function getCharTable(word) {
    let table = new Map();
    const chars = word.split('');
    chars.forEach(char => {
        var _a;
        table.set(char, ((_a = table.get(char)) !== null && _a !== void 0 ? _a : 0) + 1);
    });
    return table;
}
//# sourceMappingURL=huffman.js.map