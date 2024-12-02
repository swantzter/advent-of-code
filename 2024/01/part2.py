import sys
import pathlib

DEFAULT_FILE = pathlib.Path(__file__).parent.resolve().joinpath("data.txt")


def parse():
    a = []
    b = []

    for line in open(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE, "r"):
        row = line.split()
        a.append(int(row[0]))
        b.append(int(row[1]))

    return [a, b]


def main():
    [a, b] = parse()
    sum = 0

    for num in a:
        occ = b.count(num)
        sum += num * occ

    print(sum)


if __name__ == "__main__":
    main()
