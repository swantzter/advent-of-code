import sys
import pathlib

DEFAULT_FILE = pathlib.Path(__file__).parent.resolve().joinpath("input.txt")


def main():
    lines = [
        line for line in open(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE, "r")
    ]
    rows = len(lines)
    cols = len(lines[0])
    num_x_mas = 0

    for row in range(1, rows - 1):
        for col in range(1, cols - 1):
            if lines[row][col] == "A":
                # It's late and I ain't doing this pretty
                mas_a1 = (
                    lines[row - 1][col - 1] == "M" and lines[row + 1][col + 1] == "S"
                )
                mas_a2 = (
                    lines[row + 1][col + 1] == "M" and lines[row - 1][col - 1] == "S"
                )
                mas_b1 = (
                    lines[row + 1][col - 1] == "M" and lines[row - 1][col + 1] == "S"
                )
                mas_b2 = (
                    lines[row - 1][col + 1] == "M" and lines[row + 1][col - 1] == "S"
                )

                if (mas_a1 or mas_a2) and (mas_b1 or mas_b2):
                    num_x_mas += 1

    print(num_x_mas)


if __name__ == "__main__":
    main()
