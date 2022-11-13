/* 
    By Madu 
    On 13.11.2022
    GNU Affero General Public License v3.0
*/


class HuffmanNode {
    public name: string;
    public count: number;
    public connections: any[];
    constructor(connections: any[]) {
        this.connections = connections;
        this.name = connections[0][0] + connections[1][0];
        this.count = connections[0][1] + connections[1][1];
    }
}

const word: string = 'MISSISSIPPI';
let [code, tree] = huffman(word, false);
console.log(code);
console.log(tree);

function huffman(word: string, withSpace?: boolean): (string | Map<string, string>)[] {
    let huffmancode: string = word;

    const charTable: Map<string, number> = getCharTable(word);
    const charArray = [...charTable];
    let sortedCharArray = charArray.sort((a, b) => a[1] - b[1]);
    let nodes: HuffmanNode[] = generateAllHuffmanNodes(sortedCharArray);

    let charToBinary: Map<string, string> = getAllCharsBinaryCode(nodes, charTable, withSpace);

    charToBinary.forEach((code, char) => {
        huffmancode = huffmancode.replaceAll(char, code);
    });
    return [huffmancode, charToBinary];
}

function generateAllHuffmanNodes(sortedCharArray: [string, number][]): HuffmanNode[] {
    let nodes: HuffmanNode[] = [
        new HuffmanNode([sortedCharArray[0], sortedCharArray[1]])
    ];
    sortedCharArray.splice(0, 2);
    let node: HuffmanNode = nodes[0];
    sortedCharArray.forEach(char => {
        node = new HuffmanNode([[node.name, node.count], char]);
        nodes.push(node);
    });
    return nodes;
}

function getAllCharsBinaryCode(nodes: HuffmanNode[], charTable: Map<string, number>, withSpace: boolean): Map<string, string> {
    let charToBinary: Map<string, string> = new Map<string, string>();
    let reversedNodes = nodes.reverse();
    [...charTable].forEach(charCount => {
        const char = charCount[0];
        let code: string = '';
        reversedNodes.forEach(node => {
            if (node.connections[0][0].includes(char)) {
                code += '0';
            } else if (node.connections[1][0].includes(char)) {
                code += '1';
            }
        });
        charToBinary.set(char, code + (withSpace ? ' ' : ''));
    });
    return charToBinary;
}

function getCharTable(word: string): Map<string, number> {
    let table: Map<string, number> = new Map<string, number>();

    const chars: string[] = word.split('');
    chars.forEach(char => {
        table.set(char, (table.get(char) ?? 0) + 1);
    });

    return table;
}