import sys
import pandas as pd

path = sys.argv[1]
hec1 = open(path, "r")
if hec1.mode == "r":
    contents = hec1.read()

print("Working on it.")
sys.stdout.flush()