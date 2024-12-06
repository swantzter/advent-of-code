import sys
import pathlib
from itertools import product

DEFAULT_FILE = pathlib.Path(__file__).parent.resolve().joinpath("input.txt")

HEADING_MODS = {
    "N": (0, -1),
    "S": (0, 1),
    "E": (1, 0),
    "W": (-1, 0),
}

ROT = ["N", "E", "S", "W"]


def exiting_map(cols: int, rows: int, guard: tuple[int, int, str]) -> bool:
    if guard[2] == "N":
        return guard[1] == 0
    if guard[2] == "S":
        return guard[1] == rows - 1
    if guard[2] == "W":
        return guard[0] == 0
    if guard[2] == "E":
        return guard[0] == cols - 1


def parse() -> tuple[int, int, set[tuple[int, int]], tuple[int, int, str]]:
    lines = [
        line for line in open(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE, "r")
    ]

    rows = len(lines)
    cols = len(lines[0]) - 1  # ignore \n
    obstacles: set[tuple[int, int]] = set()
    guard: tuple[int, int, str] = ()

    for row in range(rows):
        if "^" in lines[row]:
            guard = (lines[row].index("^"), row, "N")

        for col in range(cols):
            if lines[row][col] == "#":
                obstacles.add((col, row))

    return (cols, rows, obstacles, guard)


def main():
    (cols, rows, obstacles, _guard) = parse()

    loops = 0

    for obstacle in product(range(cols), range(rows)):
        if obstacle in obstacles:
            continue

        guard = _guard

        visited: set[tuple[int, int, str]] = set()
        visited.add(guard)

        comb_obs = obstacles.union({obstacle})
        while not exiting_map(cols, rows, guard):
            next_step = (
                guard[0] + HEADING_MODS[guard[2]][0],
                guard[1] + HEADING_MODS[guard[2]][1],
                guard[2],
            )

            if next_step in visited:
                loops += 1
                break
            elif (next_step[0], next_step[1]) in comb_obs:
                next_idx = ROT.index(guard[2]) + 1
                guard = (
                    guard[0],
                    guard[1],
                    ROT[next_idx if next_idx < len(ROT) else 0],
                )
            else:
                guard = next_step
                visited.add(guard)

    print(loops)


if __name__ == "__main__":
    main()
