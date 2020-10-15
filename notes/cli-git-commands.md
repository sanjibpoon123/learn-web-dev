# Command Line and Git commands

## 1. Basic cli commands

Commands        |        Description
----------------|--------------------
```pwd```        | print working directory
```ls```          | list files in directory
```cd```         | change directory
`~`           | home directory
`..`          | up one directory
```-```           | previous working directory
`help`        | get help
`-h`          | get help
`--help`    | get help
`man`        | manual
`cat`         | output the contents of a file
`mkdir`       | create new directory
`open`        #|open a file with the associated program, a directory with Finder, or a URL with the default web browser
`ps`          | list all running processes
`kill`        | terminate existing process
`rmd`         #|permanently delete file
`rmdir`       | remove directory

&nbsp;
&nbsp;

## 2. Working with Git

### Quick Start

Commands            |        Description
--------------------|-------------------
`git clone <url>`      | Clone directory
`git checkout -b <new-branch>`   | Create new local branch
`git push -u origin <new-branch>`  | Sync local branch with remote
`git checkout <branch>`     | Checkout branch
`git push origin <branch>`  | Push branch to remote
`git branch -d <branchname>`    | deletes local branch
`git push origin :<branchname>`| deletes remote branch
`git subtree push --prefix docs origin gh-pages`  # push docs as subtree to gh-pages

&nbsp;

### Clone Directory

Commands | Description
---------|----------
`git clone <url>`

&nbsp;

### Create Project

Commands            |        Description
--------------------|-------------------
`cd project/`  |
`git init`                    | initializes the repository
`git add .`                   | add those 'unknown' files
`git commit`                  | commit all changes, edit changelog entry
`git rm --cached <file>...`   | ridiculously complicated command to undo, in case you forgot .gitignore

&nbsp;

### Branching and Merging

Commands            |        Description
--------------------|-------------------
`git branch`                        | show list of all branches (* is active)
`git checkout -b linux-work`          | create a new branch named "linux-work"
`git commit -a`         |
`git checkout master`                 | go back to master branch
`git merge linux-work`                | merge changesets from linux-work (Git >= 1.5)
`git pull . linux-work`               |merge changesets from linux-work (all Git versions)
`git branch -m <oldname> <newname>`   | rename branch
`git branch -m <newname>`             | rename current branch

&nbsp;

### Delete Project

Commands            |        Description
--------------------|-------------------
`git branch -d <branchname>` | deletes local branch
`git push origin :<branchname>`| deletes remote branch
`git remote prune <branchname>`| update local/remote sync

&nbsp;

### Merging Upstream

Commands            |        Description
--------------------|-------------------
`git remote -v`         | Get list of remote branches
`git remote add upstream <upstream github url>`  |Add original as upstream
`git remote -v`         | Check upstream
`git fetch upstream`        | Get original repo
`git checkout development`     | Switch to main branch in local fork
`git merge upstream/development`    | Merge original with fork
`git diff --name-only | uniq | xargs subl`| Fix conflicts in Sublime Text

&nbsp;

## Importing Patches

Commands            |        Description
--------------------|-------------------
`git apply < ../p/foo.patch`    |
`git commit -a`    |

&nbsp;

## Exporting Patches

Commands            |        Description
--------------------|-------------------
`git commit -a -m "commit message"`  |
`git format-patch HEAD^` | creates 0001-commit-message.txt *(HEAD^ means every patch since one revision before the tip of the branch, also known as HEAD)*

&nbsp;

## Inspecting Revisions

### inspect history visually

Commands            |        Description
--------------------|-------------------
`gitk`    |this opens a Tk window, and shows you how the revisions are connected

### inspect history

Commands            |        Description
--------------------|-------------------
`git log`     |this pipes a log of the current branch into your PAGER
`git log -p`  | ditto, but append a patch after each commit message

### inspect a specific commit

Commands            |        Description
--------------------|-------------------
`git show HEAD`  | show commit info, diffstat and patchof the tip of the current branch

&nbsp;
&nbsp;

## Referring to Revisions

### by name

Commands            |        Description
--------------------|-------------------
`git log v1.0.0` | show history leading up to tag "v1.0.0"
`git log master`  | show history of branch "master"

&nbsp;

### relative to a name

Commands            |        Description
--------------------|-------------------
`git show master^`  | show parent to last revision of master
`git show master~2`  | show grand parent to tip of master
`git show master~3`  | show great grand parent to tip of master (you get the idea)

&nbsp;

### by output of "git describe"

Commands            |        Description
--------------------|-------------------
`git show v1.4.4-g730996f`    |you get this string by calling "git describe"

&nbsp;

### by hash (internally, all objects are identified by a hash)

Commands            |        Description
--------------------|-------------------
`git show f665776185ad074b236c00751d666da7d1977dbe`
`git show f665776    # a unique prefix is sufficient`

&nbsp;

## tag a revision

Commands            |        Description
--------------------|-------------------
`git tag v1.0.0`                     | make current HEAD known as "v1.0.0"
`git tag interesting v1.4.4-g730996f`| tag a specific revision (not HEAD)

&nbsp;
&nbsp;

## Comparing Revisions

### diff between two branches

Commands            |        Description
--------------------|-------------------
`git diff origin..master`            | pipes a diff into PAGER
`git diff origin..master > my.patch` | pipes a diff into my.patch

### get diffstat of uncommitted work

Commands            |        Description
--------------------|-------------------
`git diff --stat HEAD`   |
