

const searchHelper = {

    inOrder(tree, output=[]) {

        // 1) Visit the left branch
        if (tree.left) {
            this.inOrder(tree.left, output)
        }

        // 2) handle the current node
        output.push(tree.key)

        // 3) visit the right branch
        if (tree.right) {
            this.inOrder(tree.right, output)
        }

        // return running tally
        return output

    }


}

module.exports = searchHelper;