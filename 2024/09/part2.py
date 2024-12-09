import sys
import pathlib
import itertools
from typing import TypedDict

DEFAULT_FILE = pathlib.Path(__file__).parent.resolve().joinpath("input.txt")


class File(TypedDict):
    id: int
    start: int
    end: int
    size: int


def parse() -> tuple[list[File], int]:
    input = [
        d
        for line in open(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE, "r")
        for d in map(int, line.strip())
    ]

    files: list[File] = []

    addr = 0
    file_idx = 0
    for f in itertools.batched(input, 2):
        file: File = {
            "id": file_idx,
            "start": addr,
            "size": f[0],
        }
        files.append(file)

        file_idx += 1
        addr += f[0] + (f[1] if len(f) > 1 else 0)

    return (files, files[-1]["start"] + files[-1]["size"])


def files_to_mem(files: list[File]) -> list[int | None]:
    mem_map = []

    for f_idx in range(len(files)):
        if f_idx > 0:
            for _ in range(
                files[f_idx]["start"]
                - (files[f_idx - 1]["start"] + files[f_idx - 1]["size"])
            ):
                mem_map.append(None)
        for _ in range(files[f_idx]["size"]):
            mem_map.append(files[f_idx]["id"])

    return mem_map


def print_mem(mem_map: list[int | None]):
    print("".join(["." if c is None else f"{c}" for c in mem_map]))


def main():
    (files, size) = parse()

    for file in [f for f in reversed(files)]:
        for idx in range(files.index(file)):
            gap = files[idx + 1]["start"] - (files[idx]["start"] + files[idx]["size"])
            if gap >= file["size"]:
                files.remove(file)
                file["start"] = files[idx]["start"] + files[idx]["size"]
                files.insert(idx + 1, file)
                break

    sum = 0
    for file in files:
        for offset in range(file["size"]):
            sum += (file["start"] + offset) * file["id"]

    print(sum)


if __name__ == "__main__":
    main()
