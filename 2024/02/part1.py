import sys
import pathlib

DEFAULT_FILE = pathlib.Path(__file__).parent.resolve().joinpath("input.txt")


def parse() -> list[list[int]]:
    return [
        list(map(int, line.split()))
        for line in open(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE, "r")
    ]


def main():
    reports = parse()
    num_safe: int = 0

    for report in reports:
        inc_dec = all(i < j for i, j in zip(report, report[1:])) or all(
            i > j for i, j in zip(report, report[1:])
        )
        safe_inc = max(abs(a - b) for a, b in zip(report, report[1:])) <= 3

        num_safe += 1 if inc_dec and safe_inc else 0

    print(num_safe)


if __name__ == "__main__":
    main()
