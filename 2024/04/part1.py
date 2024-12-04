import sys
import pathlib

DEFAULT_FILE = pathlib.Path(__file__).parent.resolve().joinpath("input.txt")

directions = [
    (1, 0),  # E
    (1, 1),  # SE
    (0, 1),  # S
    (-1, 1),  # SW
    (-1, 0),  # W
    (-1, -1),  # NW
    (0, -1),  # N
    (1, -1),  # NE
]


def main():
    lines = [
        line for line in open(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE, "r")
    ]
    rows = len(lines)
    cols = len(lines[0])
    num_xmas = 0

    for row in range(rows):
        for col in range(cols):
            if lines[row][col] == "X":
                for dx, dy in directions:
                    if (
                        (0 <= (row + (3 * dy)) < (rows))
                        and (0 <= (col + (3 * dx)) < (cols))
                        and lines[row + dy][col + dx] == "M"
                        and lines[row + (2 * dy)][col + (2 * dx)] == "A"
                        and lines[row + (3 * dy)][col + (3 * dx)] == "S"
                    ):
                        num_xmas += 1

    print(num_xmas)


if __name__ == "__main__":
    main()
