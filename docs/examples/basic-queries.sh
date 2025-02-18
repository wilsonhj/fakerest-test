#!/bin/bash

echo "=== Basic Stats ==="
echo "\nAverage age by city:"
fakerest-client --raw | jq '.averageAgePerCity'

echo "\nMost social users by city:"
fakerest-client --raw | jq '.userWithMostFriendsPerCity'

echo "\nMost common hobby:"
fakerest-client --raw | jq '.mostCommonHobbyOfFriendsOverall' 