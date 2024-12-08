import sys
import pathlib
import itertools

DEFAULT_FILE = pathlib.Path(__file__).parent.resolve().joinpath("input.txt")


def parse() -> tuple[tuple[int, int], dict[set[tuple[int, int]]]]:
    lines = [
        line for line in open(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE, "r")
    ]

    rows = len(lines)
    cols = len(lines[0]) - 1  # ignore \n
    antennas: dict[set[tuple[int, int]]] = {}

    for row in range(rows):
        for col in range(cols):
            if lines[row][col] != "." and lines[row][col] != "#":
                if lines[row][col] not in antennas:
                    antennas[lines[row][col]] = set()
                antennas[lines[row][col]].add((col, row))

    return ((cols, rows), antennas)


def main():
    (size, antennas) = parse()

    antinodes: set[tuple[int, int, str]] = set()

    for freq in antennas:
        for a, b in itertools.combinations(antennas[freq], 2):
            dx, dy = a[0] - b[0], a[1] - b[1]

            node = (a[0], a[1])
            while 0 <= node[0] < size[0] and 0 <= node[1] < size[1]:
                antinodes.add(node)
                node = (node[0] + dx, node[1] + dy)

            node = (a[0], a[1])
            while 0 <= node[0] < size[0] and 0 <= node[1] < size[1]:
                antinodes.add(node)
                node = (node[0] - dx, node[1] - dy)

    print(len(antinodes))


if __name__ == "__main__":
    main()
