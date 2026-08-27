const ROADMAP = [
  {
    id: "arrays", phase: 1, name: "Arrays & ArrayList", order: 1,
    conceptSummary: "Arrays are contiguous memory blocks storing same-type elements. ArrayList is dynamic. Most sequence problems use arrays as the base structure.",
    keyIdea: "Think of array problems as index games — most solutions involve careful pointer/index movement.",
    javaNote: "int[] arr = new int[n]; Arrays.sort(), Arrays.fill(), Arrays.copyOf() are your friends.",
    pattern: "Iteration, In-place modification, Index tracking",
    problems: [
      { name: "Contains Duplicate", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/contains-duplicate/", tufLink: "https://takeuforward.org/data-structure/find-the-duplicate-in-an-array-of-n-1-integers/" },
      { name: "Two Sum", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/two-sum/", tufLink: "https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/" },
      { name: "Best Time to Buy and Sell Stock", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", tufLink: "https://takeuforward.org/data-structure/stock-buy-and-sell/" },
      { name: "Maximum Subarray (Kadane's)", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/maximum-subarray/", tufLink: "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/" },
      { name: "Move Zeroes", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/move-zeroes/", tufLink: "https://takeuforward.org/data-structure/move-all-zeros-to-the-end-of-the-array/" },
      { name: "Product of Array Except Self", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/product-of-array-except-self/", tufLink: "" },
      { name: "Merge Intervals", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/merge-intervals/", tufLink: "https://takeuforward.org/data-structure/merge-overlapping-sub-intervals/" },
      { name: "Rotate Array", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/rotate-array/", tufLink: "https://takeuforward.org/data-structure/rotate-array-by-k-places/" },
      { name: "First Missing Positive", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/first-missing-positive/", tufLink: "" },
      { name: "Trapping Rain Water", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/trapping-rain-water/", tufLink: "https://takeuforward.org/data-structure/trapping-rainwater-problem/" }
    ]
  },
  {
    id: "strings", phase: 1, name: "Strings", order: 2,
    conceptSummary: "Strings in Java are immutable character sequences. Key ops: substring, charAt, indexOf, split, StringBuilder for mutations.",
    keyIdea: "Immutability is key — every String operation creates a new object. Use StringBuilder in loops.",
    javaNote: "StringBuilder sb = new StringBuilder(); sb.append('x'); sb.toString(); — always prefer this for building strings.",
    pattern: "Character frequency, Palindrome, Anagram, Substring search",
    problems: [
      { name: "Reverse String", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/reverse-string/", tufLink: "" },
      { name: "Valid Anagram", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/valid-anagram/", tufLink: "https://takeuforward.org/data-structure/check-if-two-strings-are-anagrams-of-each-other/" },
      { name: "First Unique Character in a String", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/first-unique-character-in-a-string/", tufLink: "" },
      { name: "Longest Common Prefix", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/longest-common-prefix/", tufLink: "" },
      { name: "String Compression", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/string-compression/", tufLink: "" },
      { name: "Longest Palindromic Substring", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/longest-palindromic-substring/", tufLink: "https://takeuforward.org/data-structure/longest-palindromic-substring/" },
      { name: "Find All Anagrams in a String", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/find-all-anagrams-in-a-string/", tufLink: "" },
      { name: "Longest Substring Without Repeating Characters", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", tufLink: "https://takeuforward.org/data-structure/length-of-longest-substring-without-any-repeating-character/" },
      { name: "Minimum Window Substring", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/minimum-window-substring/", tufLink: "https://takeuforward.org/data-structure/minimum-window-substring/" },
      { name: "Wildcard Matching", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/wildcard-matching/", tufLink: "https://takeuforward.org/data-structure/wildcard-matching-dp-34/" }
    ]
  },
  {
    id: "two_pointers", phase: 1, name: "Two Pointers", order: 3,
    conceptSummary: "Two pointers uses two index variables moving through the array — towards each other, same direction, or fast/slow. Reduces O(n^2) to O(n).",
    keyIdea: "Whenever you see 'pair', 'subarray', or 'sorted array' — think two pointers first.",
    javaNote: "int left = 0, right = arr.length - 1; while (left < right) { ... }",
    pattern: "Left-right squeeze, Fast-slow, Three-sum",
    problems: [
      { name: "Valid Palindrome", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/valid-palindrome/", tufLink: "" },
      { name: "Squares of a Sorted Array", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/squares-of-a-sorted-array/", tufLink: "" },
      { name: "Remove Duplicates from Sorted Array", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", tufLink: "https://takeuforward.org/data-structure/remove-duplicates-from-sorted-array/" },
      { name: "Two Sum II - Input Array Is Sorted", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", tufLink: "" },
      { name: "Sort Colors (Dutch Flag)", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/sort-colors/", tufLink: "https://takeuforward.org/data-structure/sort-an-array-of-0s-1s-and-2s/" },
      { name: "3Sum", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/3sum/", tufLink: "https://takeuforward.org/data-structure/3-sum-find-triplets-that-add-up-to-a-zero/" },
      { name: "Container With Most Water", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/container-with-most-water/", tufLink: "" },
      { name: "4Sum", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/4sum/", tufLink: "https://takeuforward.org/data-structure/4-sum-find-quads-that-add-up-to-a-target-value/" },
      { name: "Trapping Rain Water", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/trapping-rain-water/", tufLink: "https://takeuforward.org/data-structure/trapping-rainwater-problem/" },
      { name: "Minimum Window Substring", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/minimum-window-substring/", tufLink: "https://takeuforward.org/data-structure/minimum-window-substring/" }
    ]
  },
  {
    id: "sliding_window", phase: 1, name: "Sliding Window", order: 4,
    conceptSummary: "Sliding window maintains a contiguous window that grows/shrinks. Fixed window: size constant. Variable: expands/shrinks on condition.",
    keyIdea: "If the problem asks about contiguous subarray/substring with a constraint — it's sliding window.",
    javaNote: "Use HashMap or int[26] for char counts. Deque<Integer> for max/min in window.",
    pattern: "Fixed window sum, Variable window with constraint, Character frequency window",
    problems: [
      { name: "Maximum Average Subarray I", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/maximum-average-subarray-i/", tufLink: "" },
      { name: "Contains Duplicate II", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/contains-duplicate-ii/", tufLink: "" },
      { name: "Maximum Sum of Distinct Subarrays With Length K", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/", tufLink: "" },
      { name: "Minimum Size Subarray Sum", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/minimum-size-subarray-sum/", tufLink: "" },
      { name: "Longest Substring Without Repeating Characters", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", tufLink: "https://takeuforward.org/data-structure/length-of-longest-substring-without-any-repeating-character/" },
      { name: "Permutation in String", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/permutation-in-string/", tufLink: "" },
      { name: "Longest Repeating Character Replacement", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/longest-repeating-character-replacement/", tufLink: "" },
      { name: "Fruit Into Baskets", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/fruit-into-baskets/", tufLink: "https://takeuforward.org/data-structure/fruit-into-baskets/" },
      { name: "Sliding Window Maximum", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/sliding-window-maximum/", tufLink: "" },
      { name: "Minimum Window Substring", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/minimum-window-substring/", tufLink: "https://takeuforward.org/data-structure/minimum-window-substring/" }
    ]
  },
  {
    id: "binary_search", phase: 1, name: "Binary Search", order: 5,
    conceptSummary: "Binary search repeatedly halves the search space, achieving O(log n). Classic: sorted array. Advanced: search on answer space.",
    keyIdea: "Think beyond sorted arrays — binary search works on any monotonic condition.",
    javaNote: "int mid = left + (right - left) / 2; — avoids integer overflow. Always implement manually in interviews.",
    pattern: "Classic binary search, Search on answer, Finding boundaries",
    problems: [
      { name: "Binary Search", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/binary-search/", tufLink: "https://takeuforward.org/data-structure/binary-search-explained/" },
      { name: "Search Insert Position", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/search-insert-position/", tufLink: "" },
      { name: "First Bad Version", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/first-bad-version/", tufLink: "" },
      { name: "Search a 2D Matrix", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/search-a-2d-matrix/", tufLink: "https://takeuforward.org/data-structure/search-in-a-sorted-2d-matrix/" },
      { name: "Search in Rotated Sorted Array", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/search-in-rotated-sorted-array/", tufLink: "https://takeuforward.org/data-structure/search-element-in-a-rotated-sorted-array/" },
      { name: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", tufLink: "https://takeuforward.org/data-structure/minimum-in-rotated-sorted-array/" },
      { name: "Koko Eating Bananas", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/koko-eating-bananas/", tufLink: "https://takeuforward.org/binary-search/koko-eating-bananas/" },
      { name: "Find Peak Element", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/find-peak-element/", tufLink: "https://takeuforward.org/data-structure/peak-element-in-array/" },
      { name: "Median of Two Sorted Arrays", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/median-of-two-sorted-arrays/", tufLink: "https://takeuforward.org/data-structure/median-of-two-sorted-arrays-of-different-sizes/" },
      { name: "Aggressive Cows (Min Max Distance)", difficulty: "Hard", leetcodeLink: "https://www.spoj.com/problems/AGGRCOW/", tufLink: "https://takeuforward.org/data-structure/aggressive-cows-detailed-solution/" }
    ]
  },
  {
    id: "linked_list", phase: 2, name: "Linked Lists", order: 6,
    conceptSummary: "Linked list: chain of nodes, each with value + pointer to next. No random access. Key ops: insert, delete, reverse, detect cycle.",
    keyIdea: "Draw the pointers on paper before coding. Most bugs come from losing track of next pointers.",
    javaNote: "Use dummy head node to simplify edge cases. ListNode dummy = new ListNode(0); dummy.next = head;",
    pattern: "Dummy head, Fast-slow pointer, Reverse in place",
    problems: [
      { name: "Reverse Linked List", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/reverse-linked-list/", tufLink: "https://takeuforward.org/data-structure/reverse-a-linked-list/" },
      { name: "Middle of the Linked List", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/middle-of-the-linked-list/", tufLink: "https://takeuforward.org/data-structure/find-middle-element-in-a-linked-list/" },
      { name: "Linked List Cycle", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/linked-list-cycle/", tufLink: "https://takeuforward.org/data-structure/detect-a-cycle-in-a-linked-list/" },
      { name: "Merge Two Sorted Lists", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/merge-two-sorted-lists/", tufLink: "https://takeuforward.org/data-structure/merge-two-sorted-linked-lists/" },
      { name: "Remove Nth Node From End of List", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", tufLink: "https://takeuforward.org/data-structure/remove-nth-node-from-the-end-of-a-linked-list/" },
      { name: "Add Two Numbers", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/add-two-numbers/", tufLink: "https://takeuforward.org/data-structure/add-two-numbers-represented-as-linked-lists/" },
      { name: "Linked List Cycle II", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/linked-list-cycle-ii/", tufLink: "https://takeuforward.org/data-structure/starting-point-of-loop-in-a-linked-list/" },
      { name: "Reorder List", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/reorder-list/", tufLink: "" },
      { name: "Merge K Sorted Lists", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/merge-k-sorted-lists/", tufLink: "https://takeuforward.org/data-structure/merge-k-sorted-lists/" },
      { name: "Reverse Nodes in k-Group", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/reverse-nodes-in-k-group/", tufLink: "https://takeuforward.org/data-structure/reverse-linked-list-in-groups-of-size-k/" }
    ]
  },
  {
    id: "stacks", phase: 2, name: "Stacks", order: 7,
    conceptSummary: "Stack is LIFO. Used for tracking state, undoing ops, parsing. Monotonic stack solves many range queries in O(n).",
    keyIdea: "When you see 'next greater/smaller' or need to track history — reach for a stack.",
    javaNote: "Deque<Integer> stack = new ArrayDeque<>(); stack.push(x); stack.pop(); stack.peek(); — prefer over Stack class.",
    pattern: "Parentheses matching, Monotonic stack, Calculator",
    problems: [
      { name: "Valid Parentheses", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/valid-parentheses/", tufLink: "https://takeuforward.org/data-structure/balanced-parentheses/" },
      { name: "Min Stack", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/min-stack/", tufLink: "https://takeuforward.org/data-structure/implement-min-stack/" },
      { name: "Remove All Adjacent Duplicates In String", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/", tufLink: "" },
      { name: "Daily Temperatures", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/daily-temperatures/", tufLink: "" },
      { name: "Evaluate Reverse Polish Notation", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", tufLink: "" },
      { name: "Next Greater Element II", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/next-greater-element-ii/", tufLink: "" },
      { name: "Asteroid Collision", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/asteroid-collision/", tufLink: "" },
      { name: "Decode String", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/decode-string/", tufLink: "" },
      { name: "Largest Rectangle in Histogram", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/largest-rectangle-in-histogram/", tufLink: "https://takeuforward.org/data-structure/largest-rectangle-in-histogram/" },
      { name: "Basic Calculator", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/basic-calculator/", tufLink: "" }
    ]
  },
  {
    id: "queues", phase: 2, name: "Queues & Deque", order: 8,
    conceptSummary: "Queue is FIFO — essential for BFS. Deque supports both ends. Monotonic deque enables O(n) sliding window max/min.",
    keyIdea: "BFS problems always use a queue. When you need front AND back operations, use Deque.",
    javaNote: "Queue<Integer> q = new LinkedList<>(); q.offer(x); q.poll(); — Deque<Integer> dq = new ArrayDeque<>();",
    pattern: "BFS, Level order, Sliding window max",
    problems: [
      { name: "Implement Stack using Queues", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/implement-stack-using-queues/", tufLink: "" },
      { name: "Design Circular Queue", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/design-circular-queue/", tufLink: "" },
      { name: "First Unique Character in a String", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/first-unique-character-in-a-string/", tufLink: "" },
      { name: "Number of Islands (BFS)", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/number-of-islands/", tufLink: "https://takeuforward.org/graph/number-of-islands/" },
      { name: "Rotting Oranges", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/rotting-oranges/", tufLink: "https://takeuforward.org/graph/rotten-oranges-bfs-approach/" },
      { name: "Binary Tree Level Order Traversal", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/binary-tree-level-order-traversal/", tufLink: "https://takeuforward.org/data-structure/level-order-traversal-of-a-binary-tree/" },
      { name: "Open the Lock", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/open-the-lock/", tufLink: "" },
      { name: "Task Scheduler", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/task-scheduler/", tufLink: "" },
      { name: "Sliding Window Maximum", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/sliding-window-maximum/", tufLink: "" },
      { name: "Jump Game VI", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/jump-game-vi/", tufLink: "" }
    ]
  },
  {
    id: "hashing", phase: 2, name: "Hashing", order: 9,
    conceptSummary: "HashMap/HashSet gives O(1) average insert/delete/lookup. Use to track frequencies, check duplicates, or map values quickly.",
    keyIdea: "If you're doing two nested loops to compare elements, there's probably a HashMap solution in one pass.",
    javaNote: "Map<Integer,Integer> freq = new HashMap<>(); freq.getOrDefault(x, 0) + 1; — very common pattern.",
    pattern: "Frequency count, Complement pair, Grouping by key",
    problems: [
      { name: "Contains Duplicate", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/contains-duplicate/", tufLink: "https://takeuforward.org/data-structure/find-the-duplicate-in-an-array-of-n-1-integers/" },
      { name: "Ransom Note", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/ransom-note/", tufLink: "" },
      { name: "Two Sum", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/two-sum/", tufLink: "https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/" },
      { name: "Group Anagrams", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/group-anagrams/", tufLink: "https://takeuforward.org/data-structure/group-anagrams/" },
      { name: "Top K Frequent Elements", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/top-k-frequent-elements/", tufLink: "" },
      { name: "Subarray Sum Equals K", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/subarray-sum-equals-k/", tufLink: "https://takeuforward.org/data-structure/count-subarray-sum-equals-k/" },
      { name: "4Sum II", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/4sum-ii/", tufLink: "" },
      { name: "Longest Consecutive Sequence", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/longest-consecutive-sequence/", tufLink: "https://takeuforward.org/data-structure/longest-consecutive-sequence-of-numbers-use-sets/" },
      { name: "Subarrays with K Different Integers", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/subarrays-with-k-different-integers/", tufLink: "" },
      { name: "All O'one Data Structure", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/all-oone-data-structure/", tufLink: "" }
    ]
  },
  {
    id: "binary_trees", phase: 3, name: "Binary Trees", order: 10,
    conceptSummary: "Binary tree: nodes with at most 2 children. Traversals: Inorder (LNR), Preorder (NLR), Postorder (LRN), Level Order (BFS). Recursion is natural fit.",
    keyIdea: "Define clearly what your recursive function returns — that shapes the whole solution.",
    javaNote: "Base case always: if (node == null) return ...; — never forget this.",
    pattern: "DFS traversals, Height/depth, Path problems",
    problems: [
      { name: "Invert Binary Tree", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/invert-binary-tree/", tufLink: "" },
      { name: "Maximum Depth of Binary Tree", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", tufLink: "https://takeuforward.org/data-structure/maximum-depth-of-a-binary-tree/" },
      { name: "Symmetric Tree", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/symmetric-tree/", tufLink: "https://takeuforward.org/data-structure/check-whether-two-trees-are-mirror-image-or-not/" },
      { name: "Diameter of Binary Tree", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/diameter-of-binary-tree/", tufLink: "https://takeuforward.org/data-structure/calculate-the-diameter-of-a-binary-tree/" },
      { name: "Binary Tree Level Order Traversal", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/binary-tree-level-order-traversal/", tufLink: "https://takeuforward.org/data-structure/level-order-traversal-of-a-binary-tree/" },
      { name: "Binary Tree Right Side View", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/binary-tree-right-side-view/", tufLink: "https://takeuforward.org/data-structure/right-left-view-of-a-binary-tree/" },
      { name: "Lowest Common Ancestor of a Binary Tree", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", tufLink: "https://takeuforward.org/data-structure/lowest-common-ancestor-for-two-given-nodes/" },
      { name: "Path Sum II", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/path-sum-ii/", tufLink: "" },
      { name: "Binary Tree Maximum Path Sum", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", tufLink: "https://takeuforward.org/data-structure/maximum-sum-path-in-binary-tree/" },
      { name: "Serialize and Deserialize Binary Tree", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", tufLink: "https://takeuforward.org/data-structure/serialize-and-deserialize-a-binary-tree/" }
    ]
  },
  {
    id: "bst", phase: 3, name: "Binary Search Trees", order: 11,
    conceptSummary: "BST: all left children < node < all right children. O(log n) search on average. Inorder traversal gives sorted order.",
    keyIdea: "Inorder of BST = sorted array. This insight solves many BST problems instantly.",
    javaNote: "TreeMap<K,V> is a balanced BST. Use floorKey(), ceilingKey() for range queries.",
    pattern: "BST property, Inorder sorted, Validate BST",
    problems: [
      { name: "Search in a BST", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/search-in-a-binary-search-tree/", tufLink: "" },
      { name: "Range Sum of BST", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/range-sum-of-bst/", tufLink: "" },
      { name: "Minimum Absolute Difference in BST", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/minimum-absolute-difference-in-bst/", tufLink: "" },
      { name: "Validate Binary Search Tree", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/validate-binary-search-tree/", tufLink: "https://takeuforward.org/data-structure/validate-binary-search-tree/" },
      { name: "Kth Smallest Element in a BST", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", tufLink: "https://takeuforward.org/data-structure/kth-largest-smallest-element-in-binary-search-tree/" },
      { name: "Lowest Common Ancestor of a BST", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", tufLink: "https://takeuforward.org/data-structure/lowest-common-ancestor-in-a-binary-search-tree/" },
      { name: "Convert Sorted Array to BST", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/", tufLink: "" },
      { name: "Delete Node in a BST", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/delete-node-in-a-bst/", tufLink: "https://takeuforward.org/data-structure/delete-node-in-binary-search-tree/" },
      { name: "Recover Binary Search Tree", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/recover-binary-search-tree/", tufLink: "" },
      { name: "Count of Smaller Numbers After Self", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/", tufLink: "" }
    ]
  },
  {
    id: "graphs", phase: 3, name: "Graphs (BFS/DFS)", order: 12,
    conceptSummary: "Graphs: nodes connected by edges. BFS explores layer by layer (shortest path). DFS goes deep (cycle detection, topo sort).",
    keyIdea: "Mark visited nodes! Forgetting this causes infinite loops.",
    javaNote: "int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}}; — standard 4-direction template for grid problems.",
    pattern: "BFS shortest path, DFS cycle detection, Connected components",
    problems: [
      { name: "Flood Fill", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/flood-fill/", tufLink: "https://takeuforward.org/graph/flood-fill-algorithm-graphs/" },
      { name: "Find if Path Exists in Graph", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/find-if-path-exists-in-graph/", tufLink: "" },
      { name: "Find Center of Star Graph", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/find-center-of-star-graph/", tufLink: "" },
      { name: "Number of Islands", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/number-of-islands/", tufLink: "https://takeuforward.org/graph/number-of-islands/" },
      { name: "Clone Graph", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/clone-graph/", tufLink: "" },
      { name: "Course Schedule", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/course-schedule/", tufLink: "https://takeuforward.org/graph/course-schedule-i-and-ii-pre-requisite-tasks-topological-sort-g-24/" },
      { name: "Pacific Atlantic Water Flow", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/pacific-atlantic-water-flow/", tufLink: "" },
      { name: "Rotting Oranges", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/rotting-oranges/", tufLink: "https://takeuforward.org/graph/rotten-oranges-bfs-approach/" },
      { name: "Word Ladder", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/word-ladder/", tufLink: "https://takeuforward.org/graph/word-ladder-i-bfs/" },
      { name: "Critical Connections in a Network", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/critical-connections-in-a-network/", tufLink: "https://takeuforward.org/graph/bridges-in-graph-using-tarjans-algorithm-of-dfs-g-55/" }
    ]
  },
  {
    id: "recursion_backtracking", phase: 3, name: "Recursion & Backtracking", order: 13,
    conceptSummary: "Backtracking = recursion + undo: try a choice, recurse, undo if it doesn't work. Used for permutations, combinations, Sudoku, N-Queens.",
    keyIdea: "Every backtracking solution: choose -> explore -> unchoose. Draw the decision tree first.",
    javaNote: "result.add(new ArrayList<>(curr)); — always add a copy, not the reference!",
    pattern: "Choose-explore-unchoose, Pruning, Permutation/Combination",
    problems: [
      { name: "Fibonacci Number", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/fibonacci-number/", tufLink: "" },
      { name: "Power of Two", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/power-of-two/", tufLink: "" },
      { name: "Reverse String (Recursion)", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/reverse-string/", tufLink: "" },
      { name: "Subsets", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/subsets/", tufLink: "https://takeuforward.org/data-structure/power-set-print-all-the-possible-subsequences-of-the-string/" },
      { name: "Permutations", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/permutations/", tufLink: "https://takeuforward.org/data-structure/print-all-permutations-of-a-string-array/" },
      { name: "Combination Sum", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/combination-sum/", tufLink: "https://takeuforward.org/data-structure/combination-sum-1/" },
      { name: "Letter Combinations of a Phone Number", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", tufLink: "" },
      { name: "Generate Parentheses", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/generate-parentheses/", tufLink: "" },
      { name: "N-Queens", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/n-queens/", tufLink: "https://takeuforward.org/data-structure/n-queen-problem-return-all-distinct-solutions-to-the-n-queens-puzzle/" },
      { name: "Sudoku Solver", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/sudoku-solver/", tufLink: "https://takeuforward.org/data-structure/sudoku-solver/" }
    ]
  },
  {
    id: "dp_basics", phase: 4, name: "Dynamic Programming", order: 14,
    conceptSummary: "DP stores solutions to subproblems to avoid recomputation. Top-down: memoization. Bottom-up: tabulation. Patterns: knapsack, LCS, LIS, coin change.",
    keyIdea: "Always start with recursion first, then add memoization, then convert to bottom-up.",
    javaNote: "int[] dp = new int[n+1]; Arrays.fill(dp, -1); — 1D memo. int[][] dp = new int[m+1][n+1]; — 2D.",
    pattern: "Memoization, Tabulation, Knapsack, Subsequence",
    problems: [
      { name: "Climbing Stairs", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/climbing-stairs/", tufLink: "https://takeuforward.org/data-structure/dynamic-programing-introduction/" },
      { name: "House Robber", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/house-robber/", tufLink: "https://takeuforward.org/data-structure/house-robber-dp-6/" },
      { name: "Min Cost Climbing Stairs", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/min-cost-climbing-stairs/", tufLink: "" },
      { name: "Unique Paths", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/unique-paths/", tufLink: "https://takeuforward.org/data-structure/grid-unique-paths-count-paths-from-left-top-to-the-right-bottom-of-a-matrix/" },
      { name: "Coin Change", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/coin-change/", tufLink: "https://takeuforward.org/data-structure/coin-change-dp-20/" },
      { name: "Longest Increasing Subsequence", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/longest-increasing-subsequence/", tufLink: "https://takeuforward.org/data-structure/longest-increasing-subsequence-dp-41/" },
      { name: "Longest Common Subsequence", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/longest-common-subsequence/", tufLink: "https://takeuforward.org/data-structure/longest-common-subsequence-dp-25/" },
      { name: "Jump Game", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/jump-game/", tufLink: "" },
      { name: "Edit Distance", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/edit-distance/", tufLink: "https://takeuforward.org/data-structure/edit-distance-dp-33/" },
      { name: "Burst Balloons", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/burst-balloons/", tufLink: "" }
    ]
  },
  {
    id: "greedy", phase: 4, name: "Greedy Algorithms", order: 15,
    conceptSummary: "Greedy makes locally optimal choices hoping for global optimum. Works when greedy choice property + optimal substructure hold.",
    keyIdea: "Try greedy first, but have a proof. DP is safer if unsure.",
    javaNote: "Often requires sorting first. Arrays.sort(intervals, (a,b) -> a[1] - b[1]); — sort by end time.",
    pattern: "Sort then select, Interval scheduling, Activity selection",
    problems: [
      { name: "Assign Cookies", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/assign-cookies/", tufLink: "" },
      { name: "Best Time to Buy and Sell Stock II", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/", tufLink: "https://takeuforward.org/data-structure/stock-buy-and-sell/" },
      { name: "Lemonade Change", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/lemonade-change/", tufLink: "" },
      { name: "Jump Game", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/jump-game/", tufLink: "" },
      { name: "Jump Game II", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/jump-game-ii/", tufLink: "" },
      { name: "Non-overlapping Intervals", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/non-overlapping-intervals/", tufLink: "" },
      { name: "Minimum Arrows to Burst Balloons", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/", tufLink: "" },
      { name: "Gas Station", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/gas-station/", tufLink: "https://takeuforward.org/data-structure/gas-station-circuit/" },
      { name: "Candy", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/candy/", tufLink: "" },
      { name: "Minimum Number of Refueling Stops", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/minimum-number-of-refueling-stops/", tufLink: "" }
    ]
  },
  {
    id: "heaps", phase: 4, name: "Heaps & Priority Queues", order: 16,
    conceptSummary: "Heap: complete binary tree with heap property. Min-heap: root is minimum. PriorityQueue in Java is min-heap. O(log n) insert/delete, O(1) peek.",
    keyIdea: "For 'top K largest' use a min-heap of size K. For 'top K smallest' use a max-heap of size K.",
    javaNote: "PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());",
    pattern: "Top-K, Merge K sorted, Median of stream",
    problems: [
      { name: "Last Stone Weight", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/last-stone-weight/", tufLink: "" },
      { name: "Kth Largest Element in a Stream", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/kth-largest-element-in-a-stream/", tufLink: "" },
      { name: "K Closest Points to Origin", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/k-closest-points-to-origin/", tufLink: "" },
      { name: "Kth Largest Element in an Array", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/kth-largest-element-in-an-array/", tufLink: "https://takeuforward.org/data-structure/kth-largest-element-in-an-array/" },
      { name: "Top K Frequent Elements", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/top-k-frequent-elements/", tufLink: "" },
      { name: "Task Scheduler", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/task-scheduler/", tufLink: "" },
      { name: "Find K Pairs with Smallest Sums", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/", tufLink: "" },
      { name: "Reorganize String", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/reorganize-string/", tufLink: "" },
      { name: "Find Median from Data Stream", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/find-median-from-data-stream/", tufLink: "https://takeuforward.org/data-structure/find-median-from-data-stream-hard/" },
      { name: "IPO (Maximize Capital)", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/ipo/", tufLink: "" }
    ]
  },
  {
    id: "bit_manipulation", phase: 4, name: "Bit Manipulation", order: 17,
    conceptSummary: "Bit ops: AND(&), OR(|), XOR(^), NOT(~), shifts(<<,>>). XOR: a^a=0, a^0=a. Use to find uniques, swap, toggle bits.",
    keyIdea: "XOR cancels duplicates. Bit shifts multiply/divide by 2.",
    javaNote: "(n & 1) == 1 -> odd. n & (n-1) -> clears lowest set bit. Integer.bitCount(n) -> count 1-bits.",
    pattern: "XOR for unique, Bit counting, Bitmasking subsets",
    problems: [
      { name: "Single Number", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/single-number/", tufLink: "https://takeuforward.org/data-structure/find-the-number-that-appears-once-and-the-other-numbers-twice/" },
      { name: "Number of 1 Bits", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/number-of-1-bits/", tufLink: "https://takeuforward.org/data-structure/count-number-of-set-bits/" },
      { name: "Counting Bits", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/counting-bits/", tufLink: "" },
      { name: "Reverse Bits", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/reverse-bits/", tufLink: "" },
      { name: "Missing Number", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/missing-number/", tufLink: "https://takeuforward.org/data-structure/find-the-missing-number/" },
      { name: "Sum of Two Integers", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/sum-of-two-integers/", tufLink: "" },
      { name: "Bitwise AND of Numbers Range", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/bitwise-and-of-numbers-range/", tufLink: "" },
      { name: "Single Number III (Two Missing)", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/single-number-iii/", tufLink: "" },
      { name: "Maximum XOR of Two Numbers in an Array", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", tufLink: "" },
      { name: "Find Duplicate Number (XOR/Bit)", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/find-the-duplicate-number/", tufLink: "https://takeuforward.org/data-structure/find-the-duplicate-in-an-array-of-n-1-integers/" }
    ]
  }
];

function getTopicById(id) {
  return ROADMAP.find(t => t.id === id) || ROADMAP[0];
}

function getNextTopic(currentId) {
  const idx = ROADMAP.findIndex(t => t.id === currentId);
  return idx >= 0 && idx < ROADMAP.length - 1 ? ROADMAP[idx + 1] : null;
}

function getFirstTopicOfPhase(phase) {
  return ROADMAP.find(t => t.phase === phase) || ROADMAP[0];
}
