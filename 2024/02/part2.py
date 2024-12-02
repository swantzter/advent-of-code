import sys
import pathlib
import itertools

DEFAULT_FILE = pathlib.Path(__file__).parent.resolve().joinpath('data.txt')

def parse () -> list[list[int]]:
  return [
    list(map(int, line.split())) for line in open(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE, 'r')
  ]

def safe (report: list[int]) -> bool:
  inc_dec =  all(i < j for i, j in zip(report, report[1:])) or all(i > j for i, j in zip(report, report[1:]))
  safe_inc = max(abs(a - b) for a, b in zip(report, report[1:])) <= 3

  return True if inc_dec and safe_inc else False

def main ():
  reports = parse()
  num_safe: int = sum(any(safe(r) for r in itertools.combinations(report, len(report) - 1)) for report in reports)

  print(num_safe)

if __name__ == "__main__":
  main()
