import sys
import pathlib
import itertools

DEFAULT_FILE = pathlib.Path(__file__).parent.resolve().joinpath("input.txt")


def parse() -> tuple[list[int | None, int]]:
    input = [
        d
        for line in open(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE, "r")
        for d in map(int, line.strip())
    ]

    mem_map: list[int | None] = []

    file_idx = 0
    for f in itertools.batched(input, 2):
        for _ in range(f[0]):
            mem_map.append(file_idx)
        file_idx += 1

        if len(f) > 1:
            for _ in range(f[1]):
                mem_map.append(None)

    return (mem_map, len(mem_map))


def print_mem(mem: list[int | None]):
    print("".join(["." if c is None else f"{c}" for c in mem]))


def main():
    (mem_map, size) = parse()

    for block_idx in reversed(range(len(mem_map))):
        if mem_map[block_idx] is None:
            mem_map.pop()
        elif None in mem_map:
            n_idx = mem_map.index(None)
            f = mem_map.pop()
            mem_map[n_idx] = f

    sum = 0
    for idx in range(len(mem_map)):
        sum += mem_map[idx] * idx

    print(sum)


if __name__ == "__main__":
    main()
