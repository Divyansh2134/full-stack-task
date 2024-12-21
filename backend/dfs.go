package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

type Node struct {
	name string
}

type Edge struct {
	source *Node
	dest   *Node
}

type Graph struct {
	nodes []*Node
	edges []*Edge
}

func dfs(c *fiber.Ctx) error {
	err := c.SendString("hello")
	data := c.AllParams()
	for x, v := range data {
		fmt.Println(x, v)
	}
	return err
}

func (g *Graph) AddNode(n *Node) {
	g.nodes = append(g.nodes, n)
}

func (g *Graph) AddEdge(s *Node, d *Node) {
	e := &Edge{source: s, dest: d}
	g.edges = append(g.edges, e)
}

func (g *Graph) DFS(s *Node, d *Node, visited map[*Node]bool, path []string, paths *[][]string) {
	visited[s] = true
	path = append(path, s.name)

	if s == d {
		*paths = append(*paths, path)
	} else {
		for _, e := range g.edges {
			if e.source == s && !visited[e.dest] {
				g.DFS(e.dest, d, visited, path, paths)
			}
		}
	}

	delete(visited, s)
	path = path[:len(path)-1]
}
