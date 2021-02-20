class BinarySearchTree {

    constructor(key=null, value=null, parent=null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    // insertion
    insert(key, value) {

        // if tree is empty, this key is root node
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        // if tree is NOT empty, start at the tree root:
        //    compare to key to be inserted.
        //    If new key < node's key 
        //    --> new key should be in left-hand branch
        else if (key < this.key) {
            // if there IS NO left-hand branch from this parent,
            if (this.left == null) {
                // now there is:
                this.left = new BinarySearchTree(key, value, this);
            }

            // if there IS a left-hand branch from this parent,
            else {
                // recursively call this insert function with the same key/value,
                // but "on" the subtree whose root node is the left branch:
                this.left.insert(key, value);
            }
            
        }

        // If key > node's key, need to do essentially identical stuff,
        //    but to the right-hand branch
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            } else {
                this.right.insert(key, value);
            }
        }
    }

    // retrieval
    find(key) {

        // if item is at the root of the currently-considered tree, return
        if (this.key == key) {
            return this.value;
        } else if (key < this.key && this.left) {
            return this.left.find(key);
        } else if (key > this.key && this.right) {
            return this.right.find(key);
        } else {
            throw new Error('Key Error');
        }
    }

    // removal
    remove(key) {
        // we have found the key to be removed, and...
        if (this.key == key) {

            // ...the node has BOTH left- and right-branches
            if (this.left && this.right) {
                // define the "successor" to be the minimum value contained in the right branch
                const successor = this.right._findMin();

                // define the key and value of this node to be that of the successor
                this.key = successor.key;
                this.value = successor.value;

                // remove the actual successor node
                successor.remove(successor.key);
            }

            // ...the node has only a left child
            else if (this.left) {
                // simply replace this node with its left child
                this._replaceWith(this.left);
            }

            // ...the key has only a right child
            else if (this.right) {
                // simply replace
                this._replaceWith(this.right)
            }

            // ... the node has no children
            else {
                // simply remove node + refs to it
                this._replaceWith(null);
            }
        }

        // if current node is NOT the key we're looking for, keep searching
        else if (key < this.key && this.left) {
            this.left.remove(key);
        } else if (key > this.key && this.right) {
            this.right.remove(key);
        } else {
            throw new Error('Key Error');
        }
    }

    // helper method - replace
    _replaceWith(node) {
        // if the node has a parent
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            } else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        } else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            } else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }

    inOrder(values=[]) {

        // 1) visit left branch
        if (this.left) {
            // after visiting, the values array will be 
            //    the output of fully visiting/handling the left branch from this node
            values = this.left.inOrder(values);
        }

        // 2) handle the current node
        values.push(this.key);

        // 3) visit the right branch
        if (this.right) {
            // after visiting, the values array will be
            //    the output of fully visiting/handling the right branch from this node
            values = this.right.inOrder(values);
        }

        // the return from the function is whatever the state of values is right now
        return values;

    }

    preOrder(values=[]) {

        // 1) handle the current node
        values.push(this.key);
        
        // 2) visit left branch
        if (this.left) {
            // after visiting, the values array will be 
            //    the output of fully visiting/handling the left branch from this node
            values = this.left.preOrder(values);
        }

        // 3) visit the right branch
        if (this.right) {
            // after visiting, the values array will be
            //    the output of fully visiting/handling the right branch from this node
            values = this.right.preOrder(values);
        }

        // the return from the function is whatever the state of values is right now
        return values;

    }

    postOrder(values=[]) {

        // 1) visit left branch
        if (this.left) {
            // after visiting, the values array will be 
            //    the output of fully visiting/handling the left branch from this node
            values = this.left.postOrder(values);
        }

        // 2) visit the right branch
        if (this.right) {
            // after visiting, the values array will be
            //    the output of fully visiting/handling the right branch from this node
            values = this.right.postOrder(values);
        }

        // 3) handle the current node
        values.push(this.key);
        
        // the return from the function is whatever the state of values is right now
        return values;

    }

    

}

module.exports = BinarySearchTree;