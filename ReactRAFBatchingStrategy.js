/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactRAFBatchingStrategy
 */

/**
 * Imports
 */
import raf from 'raf';
import ReactUpdates from 'react/lib/ReactUpdates';

/**
 * Flush batched updates and setup next render.
 */
function tick() {
  ReactUpdates.flushBatchedUpdates();
  raf(tick);
}

/**
 * Constants.
 */
const arraySlice = Array.prototype.slice;

/**
 * ReactRAFBatchingStrategy.
 */
const ReactRAFBatchingStrategy = {
  isBatchingUpdates: true,
  /**
   * Call the provided function in a context within which calls to `setState`
   * and friends are batched such that components aren't updated unnecessarily.
   */
  batchedUpdates: function(callback) {
    callback.apply(null, arraySlice.call(arguments, 1));
  }
};

/**
 * Start rendering batches.
 */
raf(tick);

/**
 * Exports.
 */
export default ReactRAFBatchingStrategy;
