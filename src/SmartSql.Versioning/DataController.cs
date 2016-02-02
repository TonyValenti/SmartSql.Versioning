using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartSql.Versioning {

    public class DataController<TDbContext, TInstance, TValue>
        where TDbContext : DbContext, new()
        where TInstance : Instance<TValue>, new()
        where TValue : Revision<TInstance>, new() {
        private TDbContext __Context;

        public TDbContext Context {
            get {
                if (__Context == null) {
                    __Context = new TDbContext();
                }

                return __Context;
            }
            set {
                __Context = value;
            }
        }

        public Author Default_Author { get; set; }

        /// <summary>
        /// Gets the complete list of all values in the database.
        /// </summary>
        protected virtual IQueryable<TValue> AllQuery {
            get {
                return Context.Set<TValue>();
            }
        }

        public virtual TValue Add(Object Value) {
            var NewValue = Mapper.Instance.Map<TValue>(Value);
            return Add(NewValue);
        }

        public virtual TValue Add(TValue Value) {
            var Root = CreateNewInstance();
            Context.SaveChanges();

            Value.InstanceId = Root.InstanceId;

            return Update(Value);
        }

        public TValue Archive(Object ObjectWithInstanceId) {
            var InstanceId = Mapper.Instance.Map<TInstance>(ObjectWithInstanceId).InstanceId;
            return Archive(InstanceId);
        }

        /// <summary>
        /// Archives the specified instance.  All values other than the InstanceId are ignored.
        /// </summary>
        /// <param name="Value"></param>
        /// <returns></returns>
        public TValue Archive(TValue Value) {
            return Archive(Value.InstanceId);
        }

        /// <summary>
        /// Archives the specified instance.
        /// </summary>
        /// <param name="InstanceId"></param>
        /// <returns></returns>
        public TValue Archive(Guid InstanceId) {
            return Archive(InstanceId, true);
        }

        /// <summary>
        /// Sets the archive status on the specified instance.  All other values are ignored.
        /// </summary>
        /// <param name="Value"></param>
        /// <param name="Status"></param>
        /// <returns></returns>
        public TValue Archive(TValue Value, bool Status) {
            return Archive(Value.InstanceId, Status);
        }

        /// <summary>
        /// Sets the archive status on the specified instance.
        /// </summary>
        /// <param name="InstanceId"></param>
        /// <param name="Status"></param>
        /// <returns></returns>
        public virtual TValue Archive(Guid InstanceId, bool Status) {
            var ret = Item(InstanceId);
            if (ret != null && ret.IsArchived != Status) {
                ret.IsArchived = Status;
                ret = Update(ret);
            }

            return Detatch(ret);
        }

        public List<TValue> History(object ObjectWithInstanceId) {
            var InstanceId = Mapper.Instance.Map<TInstance>(ObjectWithInstanceId).InstanceId;
            return History(InstanceId);
        }

        /// <summary>
        /// Retrieves the complete revision history of an instance.
        /// This will also retrieve the history for archived items.
        /// </summary>
        /// <param name="InstanceId"></param>
        /// <returns></returns>
        public virtual List<TValue> History(Guid InstanceId) {
            var ret = ItemQuery(InstanceId)
                .AsNoTracking()
                .IncludeHistory(true)
                .IncludeArchived(true)
                .OrderByRevisionDateDescending()
                ;

            return ret.ToList();
        }

        public virtual TValue Item(object ObjectWithInstanceId) {
            var InstanceId = Mapper.Instance.Map<TInstance>(ObjectWithInstanceId).InstanceId;
            return Item(InstanceId);
        }

        /// <summary>
        /// Retrieves the most recent revision of an item.  This will also retrieve archived items.
        /// </summary>
        /// <param name="InstanceId"></param>
        /// <returns></returns>
        public virtual TValue Item(Guid InstanceId) {
            return ItemQuery(InstanceId)
                .AsNoTracking()
                .WhereIsCurrent()
                .FirstOrDefault()
                ;
        }

        /// <summary>
        /// Returns all current items that are not archived.
        /// </summary>
        /// <returns></returns>
        public List<TValue> List() {
            var Query = AllQuery
                .AsNoTracking()
                .IncludeHistory(false)
                .IncludeArchived(false)
                ;

            return Query.ToList();
        }

        /// <summary>
        /// Returns all current items including items that have been archived.
        /// </summary>
        /// <returns></returns>
        public List<TValue> ListAll() {
            var Query = AllQuery
                .AsNoTracking()
                .IncludeHistory(false)
                .IncludeArchived(true)
                ;

            return Query.ToList();
        }

        public TValue Restore(Object ObjectWithInstanceId) {
            var InstanceId = Mapper.Instance.Map<TInstance>(ObjectWithInstanceId).InstanceId;
            return Restore(InstanceId);
        }

        /// <summary>
        /// Restores the specified instance.  All values other than the InstanceId are ignored.
        /// </summary>
        /// <param name="Value"></param>
        /// <returns></returns>
        public TValue Restore(TValue Value) {
            return Restore(Value.InstanceId);
        }

        /// <summary>
        /// Restores the specified instance.
        /// </summary>
        /// <param name="InstanceId"></param>
        /// <returns></returns>
        public TValue Restore(Guid InstanceId) {
            return Archive(InstanceId, false);
        }

        /// <summary>
        /// Searches though all items that would be returned by List.
        /// Does not search through history or archived items.
        /// </summary>
        /// <returns></returns>
        public IQueryable<TValue> Search() {
            return Search(false, false);
        }

        /// <summary>
        /// Searches through all items.
        /// </summary>
        /// <param name="IncludeHistory">If true, revisions are searched as well.</param>
        /// <param name="IncludeArchived">If true, archived items are searched as well.</param>
        /// <returns></returns>
        public virtual IQueryable<TValue> Search(bool IncludeHistory, bool IncludeArchived) {
            var Query = AllQuery
                .AsNoTracking()
                .IncludeHistory(IncludeHistory)
                .IncludeArchived(IncludeArchived)
                ;

            return Query;
        }

        public virtual TValue Update(object ObjectWithInstanceId) {
            var InstanceId = Mapper.Instance.Map<TInstance>(ObjectWithInstanceId).InstanceId;
            return Update(InstanceId, ObjectWithInstanceId);
        }

        public virtual TValue Update(Guid InstanceId, object NewValues) {
            var Original = Context.Set<TValue>()
                .HasInstanceId(InstanceId)
                .WhereIsOriginal()
                .FirstOrDefault();

            var Currents = Context.Set<TValue>()
                .HasInstanceId(InstanceId)
                .WhereIsCurrent()
                .ToList();

            TValue NewValue = null;
            if (Original == null) {
                NewValue = Mapper.Instance.Map<TValue>(NewValues);
            } else {
                NewValue = new TValue();
                Mapper.CreateMap<TValue, TValue>();

                NewValue =  Mapper.Instance.Map<TValue, TValue>(Original, NewValue);
                NewValue = Mapper.Instance.Map(NewValues, NewValue);
            }

            NewValue.InstanceId = InstanceId;
            NewValue.RevisionId = Guid.Empty;
            NewValue.Author = new AuthorHelper(Context).FindCreateAuthor(Default_Author);
            NewValue.RevisionDateUtc = DateTime.UtcNow;
            NewValue.IsCurrent = true;

            CustomizeNewValue(NewValue);

            if (Original == null) {
                NewValue.IsOriginal = true;
                NewValue.CreatedDateUtc = NewValue.RevisionDateUtc;
            }

            foreach (var item in Currents) {
                item.IsCurrent = false;
            }

            Context.Set<TValue>().Add(NewValue);

            Context.SaveChanges();

            return Detatch(NewValue);
        }

        public virtual TValue Update(TValue Value) {
            return Update(Value.InstanceId, Value);
        }

        protected virtual TInstance CreateNewInstance() {
            var ret = new TInstance();

            Context.Set<TInstance>().Add(ret);
            
            return ret;
        }

        protected virtual void CustomizeNewValue(TValue NewValue) {
            
        }

        protected T Detatch<T>(T Item) where T : class {
            Context.Entry(Item).State = EntityState.Detached;
            return Item;
        }

        protected virtual IQueryable<TValue> ItemQuery(Guid InstanceId) {
            var ret = AllQuery
                .HasInstanceId(InstanceId)
                ;

            return ret;
        }
    }
}
