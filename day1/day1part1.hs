import System.IO

main = do
  handle <- openFile "./input.txt" ReadMode
  contents <- hGetContents handle
  let singlewords = words contents
      list = (map read :: [String] -> [Integer]) singlewords
  print $ sumOfIncreases list
  hClose handle

sumOfIncreases :: [Integer] -> Integer
sumOfIncreases list = foldr (\bool sumSoFar -> if bool then sumSoFar + 1 else sumSoFar) 0 bools
  where
    bools = zipWith (<) list (tail list)