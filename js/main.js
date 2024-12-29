import { dsaturColoring, greedyColoring, welshPowellColoring } from './coloring.js';
import { generateRandomGraph } from './graph.js';

document.getElementById('generateGraph').addEventListener('click', () => {
    const algorithm = document.getElementById('algorithm').value;
    const graph = generateRandomGraph(16, 0.5); 

    let coloring;
    if (algorithm === 'greedy') {
        coloring = greedyColoring(graph);
    } else if (algorithm === 'welsh') {
        coloring = welshPowellColoring(graph);
    } else if (algorithm === 'dsatur') {
        coloring = dsaturColoring(graph);
    }

    visualizeGraph(graph, coloring);
});

function visualizeGraph(graph, coloring) {
    cytoscape({
        container: document.getElementById('cy'),
        elements: [...graph.nodes, ...graph.edges],
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': ele => `hsl(${(coloring[ele.id()] || 0) * 60}, 100%, 50%)`,
                    'label': 'data(id)'
                }
            },
            {
                selector: 'edge',
                style: {
                    'line-color': '#ccc',
                    'width': 2
                }
            }
        ],
        layout: {
            name: 'circle'
        }
    });
}
