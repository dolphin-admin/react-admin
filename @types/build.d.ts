declare module '~build/time' {
  const now: string
  export default now
}

declare module '~build/git' {
  const github: string
  /** The current branch */
  const branch: string
  /** SHA of the current commit */
  const sha: string
  /** The first 10 chars of the current SHA */
  const abbreviatedSha: string
  /** The tag for the current SHA (or `null` if no tag exists) */
  const tag: string | null
  /** Tag for the closest tagged ancestor (or `null` if no ancestor is tagged) */
  const lastTag: string | null
  /** The committer of the current SHA */
  const committer: string
  /** The commit date of the current SHA */
  const committerDate: string
  /** The author for the current SHA */
  const author: string
  /** The authored date for the current SHA */
  const authorDate: string
  /** The commit message for the current SHA */
  const commitMessage: string
  /**
   * The root directory for the Git repo or submodule.
   * If in a worktree, this is the directory containing the original copy, not the worktree.
   */
  const root: string
  /**
   * The directory containing Git metadata for this repo or submodule.
   * If in a worktree, this is the primary Git directory for the repo, not the worktree-specific one.
   */
  const commonGitDir: string
  /**
   * If in a worktree, the directory containing Git metadata specific to this worktree.
   * Otherwise, this is the same as `commonGitDir`.
   */
  const worktreeGitDir: string
}
