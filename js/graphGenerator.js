export function generatePlanarGraph(density) {
    const nodes = [];
    const edges = [];

    for (let i = 0; i < 16; i++) {
        nodes.push({ data: { id: `n${i}` } });
    }

    const delaunayEdges = createDelaunayEdges(nodes);

    const maxEdges = (nodes.length * (nodes.length - 1)) / 2;
    const targetEdgeCount = Math.floor(maxEdges * density);
    const edgesToRemove = delaunayEdges.length - targetEdgeCount;

    let graph = { nodes, edges: delaunayEdges };
    for (let i = 0; i < edgesToRemove; i++) {
        const cycleEdges = detectCycles(graph);
        if (cycleEdges.length > 0) {
            graph.edges = graph.edges.filter(e => e !== cycleEdges[0]);
        }
    }

    return graph;
}

function createDelaunayEdges(nodes) {
    const edges = [];

    // Generate Delaunay triangulation using a naive algorithm (for simplicity)
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            edges.push({
                data: {
                    source: nodes[i].data.id,
                    target: nodes[j].data.id
                }
            });
        }
    }

    return edges;
}

function detectCycles(graph) {
    const visited = new Set();
    const stack = [];

    function dfs(node, parent) {
        if (visited.has(node)) return true;
        visited.add(node);
        stack.push(node);

        for (const edge of graph.edges) {
            const neighbor = edge.data.source === node ? edge.data.target : edge.data.target === node ? edge.data.source : null;
            if (neighbor && neighbor !== parent) {
                if (dfs(neighbor, node)) return true;
            }
        }

        stack.pop();
        return false;
    }

    for (const node of graph.nodes.map(n => n.data.id)) {
        if (!visited.has(node) && dfs(node, null)) {
            return stack.map((id, index) => ({
                data: {
                    source: id,
                    target: stack[index + 1] || stack[0]
                }
            }));
        }
    }

    return [];
}
